# @thymeapp/mobile

On the **Mac host**:

```bash
cd packages/mobile
bun start
```

Then press `i` for the iOS Simulator. That is Metro + Expo Go for SDK 57, not `expo run:ios`.

For a physical iPhone, App Store Expo Go is SDK 54 and will not open this app. Install an SDK 57 Expo Go from [expo.dev/go](https://expo.dev/go) or [sign.expo.dev](https://sign.expo.dev/), copy `.env.example` to `.env.local`, and set `REACT_NATIVE_PACKAGER_HOSTNAME` to the Mac LAN IP.
