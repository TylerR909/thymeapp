---
applyTo: "packages/server/**/*"
---

# Backend Development

## Overview
**Bun/Node.js API server** for ThymeApp's self-hosted architecture
- RESTful API endpoints
- Federated social features
- Privacy-focused data handling

## Tech Stack
- **Runtime**: Bun (Node.js compatible), Docker-Compose
- **Database**: PostgreSQL + DrizzleORM
- **API**: RESTful design
- **Auth**: Self-hosted authentication

## Key Features
- **User authentication**: Registration, login flows
- **Data privacy**: Granular sharing controls
- **Data import**: Swarm, Google Maps, Lifecycle support
- **Federated social**: Cross-server friend requests

## Development Guidelines
- Use Bun runtime when possible
- Implement proper error handling and validation
- Follow RESTful API conventions
- Privacy by default - explicit opt-ins required

## API Patterns
- Standard HTTP methods (GET, POST, PUT, DELETE)
- Consistent JSON responses
- Proper status codes
- Input validation and sanitization
