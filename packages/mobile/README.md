# @thymeapp/mobile

On the **Mac host** (development build, not Expo Go):

```bash
bun run ios                 # Simulator: compile, install, Metro
bun run ios -- --device     # iPhone (dev client, needs Metro)
bun run ios:release         # iPhone, embedded JS, no Metro (7-day signing)
bun start                   # later: Metro only, then `i`
```

There is no committed `ios/*.xcodeproj`. `bunx expo prebuild` generates it; `xed ios` opens the workspace. See [`docs/TOOLING.md`](../../docs/TOOLING.md).

`REACT_NATIVE_PACKAGER_HOSTNAME` is a per-machine key. Expo 57 will refuse it in `.env` — put it in gitignored `.env.local`. Simulator does not need that file.

User-facing strings: wrap with Lingui (`<Trans>` / `t\`...\``) and run `bun run i18n:extract`.
