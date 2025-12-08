# Project Optimization Tasks

## 1. Architecture: Migrate to Server Actions
- [x] Migrate `api/profile` to Server Actions
- [x] Migrate `api/history` to Server Actions
- [x] Migrate `api/leaderboard` to Server Actions
- [x] Migrate `api/auth/*` to Server Actions
- [x] Remove unused API routes

## 2. Feature: Activity Heatmap
- [ ] Design Heatmap component
- [ ] Implement data fetching for yearly activity (requires new DB query)
- [ ] Integrate Heatmap into Profile page
- [ ] Add "Coming Soon" removal and final polish

## 3. Feature: Custom Text Mode
- [ ] Update `TypingMode` type and constants
- [ ] Add "Custom" option to Mode selector
- [ ] Create UI for text input/paste (Modal or dedicated page)
- [ ] Store custom text in store/state
- [ ] Adapt `TextDisplay` and `wpmCalculator` to handle custom text
