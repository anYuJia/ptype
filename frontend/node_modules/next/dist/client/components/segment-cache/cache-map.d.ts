import type { VaryPath } from './vary-path';
/**
 * A specialized data type for storing multi-key cache entries.
 *
 * The basic structure is a map whose keys are tuples, called the keypath.
 * When querying the cache, keypaths are compared per-element.
 *
 * Example:
 *   set(map, ['https://localhost', 'foo/bar/baz'], 'yay');
 *   get(map, ['https://localhost', 'foo/bar/baz']) -> 'yay'
 *
 * NOTE: Array syntax is used in these examples for illustration purposes, but
 * in reality the paths are lists.
 *
 * The parts of the keypath represent the different inputs that contribute
 * to the entry value. To illustrate, if you were to use this data type to store
 * HTTP responses, the keypath would include the URL and everything listed by
 * the Vary header.
 *
 * See vary-path.ts for more details.
 *
 * The order of elements in a keypath must be consistent between lookups to
 * be considered the same, but besides that, the order of the keys is not
 * semantically meaningful.
 *
 * Keypaths may include a special kind of key called Fallback. When an entry is
 * stored with Fallback as part of its keypath, it means that the entry does not
 * vary by that key. When querying the cache, if an exact match is not found for
 * a keypath, the cache will check for a Fallback match instead. Each element of
 * the keypath may have a Fallback, so retrieval is an O(n ^ 2) operation, but
 * it's expected that keypaths are relatively short.
 *
 * Example:
 *   set(cacheMap, ['store', 'product', 1], PRODUCT_PAGE_1);
 *   set(cacheMap, ['store', 'product', Fallback], GENERIC_PRODUCT_PAGE);
 *
 *   // Exact match
 *   get(cacheMap, ['store', 'product', 1]) -> PRODUCT_PAGE_1
 *
 *   // Fallback match
 *   get(cacheMap, ['store', 'product', 2]) -> GENERIC_PRODUCT_PAGE
 *
 * Because we have the Fallback mechanism, we can impose a constraint that
 * regular JS maps do not have: a value cannot be stored at multiple keypaths
 * simultaneously. These cases should be expressed with Fallback keys instead.
 *
 * Additionally, because values only exist at a single keypath at a time, we
 * can optimize successive lookups by caching the internal map entry on the
 * value itself, using the `ref` field. This is especially useful because it
 * lets us skip the O(n ^ 2) lookup that occurs when Fallback entries
 * are present.
 *

 * How to decide if stuff belongs in here, or in cache.ts?
 * -------------------------------------------------------
 *
 * Anything to do with retrival, lifetimes, or eviction needs to go in this
 * module because it affects the fallback algorithm. For example, when
 * performing a lookup, if an entry is stale, it needs to be treated as
 * semantically equivalent to if the entry was not present at all.
 *
 * If there's logic that's not related to the fallback algorithm, though, we
 * should prefer to put it in cache.ts.
 */
type MapEntryShared<V extends MapValue> = {
    parent: MapEntry<V> | null;
    key: any;
    map: Map<any, MapEntry<V>> | null;
    prev: MapEntry<any> | null;
    next: MapEntry<any> | null;
    size: number;
};
type EmptyMapEntry<V extends MapValue> = MapEntryShared<V> & {
    value: null;
};
type FullMapEntry<V extends MapValue> = MapEntryShared<V> & {
    value: V;
};
export type MapEntry<V extends MapValue> = EmptyMapEntry<V> | FullMapEntry<V>;
export type CacheMap<V extends MapValue> = MapEntry<V>;
export interface MapValue {
    ref: MapEntry<any> | null;
    size: number;
    staleAt: number;
    version: number;
}
export type FallbackType = {
    __brand: 'Fallback';
};
export declare const Fallback: FallbackType;
export declare function createCacheMap<V extends MapValue>(): CacheMap<V>;
export declare function getFromCacheMap<V extends MapValue>(now: number, currentCacheVersion: number, rootEntry: CacheMap<V>, keys: VaryPath, isRevalidation: boolean): V | null;
export declare function isValueExpired<V extends MapValue>(now: number, currentCacheVersion: number, value: V): boolean;
export declare function setInCacheMap<V extends MapValue>(cacheMap: CacheMap<V>, keys: VaryPath, value: V, isRevalidation: boolean): void;
export declare function deleteFromCacheMap<V extends MapValue>(value: V): void;
export declare function setSizeInCacheMap<V extends MapValue>(value: V, size: number): void;
export {};
