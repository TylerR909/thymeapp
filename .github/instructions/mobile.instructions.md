---
applyTo: "packages/mobile/**/*"
---

# Mobile Development

## App Overview
**Self-hosted location tracking** similar to Swarm (by Foursquare) and LifeCycle (by Sleep Cycle). Architecture is inspired by Immich whereupon users host and manage their own self-hosted private server, and a mobile application anyone can download for free is published which can then connect to your own self-hosted server. It aims to give users and families full ownership over their sensitive location history, visualize that data in fun ways, and share specific events (such as Restaurant check-ins) with friends (either on your own multi-tenant server or across federated servers to other self-hosters). 

> 📋 **Key Reference**: `packages/mobile/src/SCREENS.md` for detailed feature specs

## Tech Stack
- **Framework**: React Native + Expo managed workflow
- **Navigation**: Expo Router (file-based)
- **Database**: SQLite + Drizzle ORM
- **Styling**: React Native StyleSheet

## Key Features
- **Offline-first**: GPS snapshots for later check-ins
- **Location check-ins**: GPS detection, confirmation UI
- **Maps**: History, heat maps, movement patterns
- **Self-hosted auth**: URL input, QR codes
- **Social**: Friends across servers, privacy controls

## Architecture Principles
- **Offline-first**: Work without internet
- **Eventual-login**: Collect data without immediate login
- **Import-ready**: Swarm, Google Maps data support
- **Privacy-first**: Default minimal sharing
- **Federated**: Cross-server friend networks

## Development Notes
- Test on both iOS and Android
- Handle location permissions gracefully
- Implement reverse geocoding for check-ins
- Support backdated check-ins
