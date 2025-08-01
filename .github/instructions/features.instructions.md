# App Features & Screens

## Primary Reference
� **`packages/mobile/src/SCREENS.md`** - Complete feature specifications

## App Concept
**Self-hosted location tracking** similar to Swarm (by Foursquare) and LifeCycle (by Sleep Cycle). The architecture is inspired by Immich whereupon users host and manage their own self-hosted private server, and a mobile application anyone can download for free is published which can then connect to your own self-hosted server. It aims to give users and families full ownership over their sensitive location history, visualize that data in fun ways, and share specific events (such as Restaurant check-ins) with friends (either on your own multi-tenant server or across federated servers to other self-hosters). 

The server is a docker-compose based setup with a custom-built application and a postgres database. It will also host a web server to serve up the `packages/web/*` workspace so users can see their data in a Browser, and also so the server owner can administrate his server, manage users, see external connections if able, and so on. Server owners should not be able to see their users' private data, and such data should be encrypted somehow and enforced with Row-level Security.

The mobile app `packages/mobile/*` is the primary aggrigator for user data. Its primary purpose is to collect user Location data, offer Check-ins to verified nearby businesses, and track movement history (perhaps even integrating with mobile Health apps to track work-outs in the far, far future). It is an offline-first applicatino that syncs with the server "when able." It should be usable without an internet connection, and while a logged-in status should be preferred, it technically doesn't need it to start collecting data and eventually log in to a server and sync with it.

## Key Features
- **Ownership**: Users own their data, self-hosted server
- **Check-ins**: GPS-based with gamification (coins, streaks)
- **Summaries**: Visualize location history, heat maps, movement patterns
- **Maps**: History, heat maps, movement patterns
- **Import**: Swarm, Google Maps, Lifecycle data. Users should be able to export all of their data to migrate to a new server.
- **Social**: Friends across federated servers
