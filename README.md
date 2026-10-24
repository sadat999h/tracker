# DAYMARK

A dark-only, private, local-first life telemetry app built with Expo and React Native.

## Phase 0 setup

```bash
npm install
npm run typecheck
npm run lint
npm test
npm run start
```

- Use `npm run android` for Android and `npm run ios` for iOS.
- The Home tab is a Phase 0 visual composition based on a development-only fixture.
- The hidden primitive gallery route is `/components` in a development build.
- SQLCipher requires an Expo development build; Expo Go cannot validate encrypted database configuration.

See `docs/PROGRESS.md` and `CLAUDE.md` for scope, decisions, and phase protocol.
