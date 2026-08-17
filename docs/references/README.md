# Product references

ThymeApp is **not** a clone of either app. It combines both mental models in a self-hosted, privacy-first product (Immich-style: one public mobile app, your own server).

When a human or agent says **“Swarm/Lifecycle”**, they mean this pair:

| Phrase | App | Canonical recap | Role in ThymeApp |
| --- | --- | --- | --- |
| **Swarm**, Foursquare Swarm, 4sq | [Foursquare Swarm](./swarm.md) | Explicit check-ins, POI database, stickers, mayorships, coins, friend map, backfill suggestions | Check-in UX, gamification, social sharing of *events* (e.g. restaurant visits) |
| **Lifecycle**, Life Cycle, LifeCycle | [Life Cycle (Sleep Cycle / Northcube)](./lifecycle.md) | Passive background tracking, Significant Locations, donut/pie “slices”, weekly journal, reconstruct history after months away | Automatic pings/pathing, place categorization, recaps, low-effort history |

Read both recaps before designing screens, data models, or copy that mentions either name.

## How the two models fit together

- **Lifecycle-style collection is always on** (or as on as permissions allow). The phone records stays, motion, and time-at-place without asking the user to tap anything. Opening the app after a long gap should still show a complete picture.
- **Swarm-style check-ins are intentional.** A visit can be confirmed, backdated, suggested from a stay, or dismissed. Check-ins are the shareable, searchable, gamified layer on top of raw movement.
- **Sharing defaults to Swarm’s “Off the Grid” instinct.** Check-ins can be shared with friends; raw pathing and lifecycle data stay private unless the user later opts in.
- **Import** should accept Swarm and Life Cycle (and Google Maps) exports so history is not trapped in those apps.

Screen-level product notes live in [`packages/mobile/src/SCREENS.md`](../../packages/mobile/src/SCREENS.md).
