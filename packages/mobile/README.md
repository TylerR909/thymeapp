# @thymeapp/mobile

On the **Mac host** (development build, not Expo Go):

```bash
bun run ios                 # Simulator: compile, install, Metro
bun run ios -- --device     # iPhone
bun start                   # later: Metro only, then `i`
```

There is no committed `ios/*.xcodeproj`. `bunx expo prebuild` generates it; `xed ios` opens the workspace. See [`docs/TOOLING.md`](../../docs/TOOLING.md).

Physical device on LAN: gitignored `.env.local` with `REACT_NATIVE_PACKAGER_HOSTNAME=<Mac LAN IP>`. Simulator does not need that file.

User-facing strings: wrap with Lingui (`<Trans>` / `t\`...\``) and run `bun run i18n:extract`.
