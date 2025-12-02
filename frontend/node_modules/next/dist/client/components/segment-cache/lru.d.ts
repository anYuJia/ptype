import type { MapEntry } from './cache-map';
type LRUNode = MapEntry<any>;
export declare function lruPut(node: LRUNode): void;
export declare function updateLruSize(node: LRUNode, newNodeSize: number): void;
export declare function deleteFromLru(deleted: LRUNode): void;
export {};
