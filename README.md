# MedMinder

MedMinder is a cross-platform medication management app consisting of a mobile client and a backend server. This repository contains the full project source: an Expo-based React Native client in `medminder_client/` and the server implementation in `medminder_server/`.

This README describes the finished product: how it works, the architecture, how to run it locally, deployment notes, and contribution guidance.

## Table of contents

- Features
- Quick demo (screenshots)
- Architecture & tech stack
- Getting started (development)
- Building for production
- Testing
- Deployment notes
- Contributing
- License
- Contact

## Features

- Medication schedules: add medicines, set dose, frequency, and reminders.
- Smart reminders: persistent notifications with snooze and confirm actions.
- Adherence tracking: visual history and statistics of taken/missed doses.
- Multi-user support and secure authentication (server-backed accounts).
- Offline-first client with local storage and background sync when online.
- Accessibility-friendly UI and theming (light/dark / system).

## Quick demo

Screenshots and walkthroughs live in `medminder_client/assets/images/`. The app includes:

- Dashboard: upcoming doses and quick actions
- Schedule editor: create and edit medication schedules
- History: adherence timeline and charts

## Architecture & tech stack

- Mobile client: Expo (React Native, TypeScript), located at `medminder_client/`.
  - Navigation: Expo Router
  - UI: custom themed components in `components/` with adaptive color scheme hooks
  - Storage: SQLite / AsyncStorage (client-side cache and offline persistence)
- Server: Node.js (Express / Fastify or similar) in `medminder_server/` (see `package.json`).
  - Auth: JWT-based authentication and refresh
  - Database: PostgreSQL (or a cloud-hosted managed DB)
  - Push notifications: platform push services (APNs / FCM) coordinated by the server

## Getting started (development)

Prerequisites

- Node.js (18+ recommended) and npm or yarn
- Expo CLI (for the mobile client) if running mobile app locally
- A running Postgres instance for server development (or use a provided Docker Compose if available)

1) Clone the repo

   git clone https://github.com/ACodes3/MedMinder.git
   cd MedMinder

2) Install dependencies

- Client

   cd medminder_client
   npm install

- Server

   cd ../medminder_server
   npm install

3) Configure environment

- Create a `.env` in `medminder_server/` with the required variables (example keys: DATABASE_URL, JWT_SECRET, PORT, PUSH_CREDENTIALS). Example env file contents should be in `medminder_server/.env.example` if present.

4) Run development servers

- Start server (from repo root or `medminder_server/`):

   cd medminder_server
   npm run dev

- Start client (from `medminder_client/`):

   cd ../medminder_client
   npm start

Open the Expo dev tools in the browser and launch on an emulator, simulator, or physical device.

Notes for Windows (cmd.exe): use the commands above in a single cmd terminal per service. If environment setup scripts use Unix-only features, run them using WSL or adapt scripts accordingly.

## Building for production

- Client: follow Expo's build process. For a managed Expo app, build with EAS or the classic build commands:

   cd medminder_client
   eas build --platform ios
   eas build --platform android

- Server: create a production build and run under a process manager (PM2) or containerize with Docker. Ensure environment variables and secrets are set securely.

## Testing

- Unit & integration tests for client and server can be run using the test scripts defined in each `package.json`.
  - Client: `cd medminder_client && npm test`
  - Server: `cd medminder_server && npm test`

Include end-to-end tests for key flows (scheduling, notifications, auth) where possible.

## Deployment notes

- Server: deploy to a managed Node host (Heroku, Render, Fly, AWS ECS/Fargate) or as a Docker container. Ensure the database is backed up and connection strings use TLS in production.
- Client: publish via the App Store and Google Play (signed APK/AAB) or use Expo's managed publishing.
- Push notifications require platform credentials (APNs key for iOS, Firebase config for Android).

## Data privacy & security

- Sensitive data (auth secrets, DB credentials) must never be committed to the repo. Use environment variables or secret stores.
- Communications should be encrypted with HTTPS/TLS.

## Contributing

Contributions are welcome. To propose changes:

1. Fork the repository
2. Create a feature branch
3. Add tests for new behavior
4. Open a pull request describing your changes

Please follow the existing code style. Lint and type-check before opening PRs.

## Troubleshooting

- If the client can't connect to the server, verify server URL and CORS settings, and confirm the server is running on the configured port.
- Notifications not appearing: check push credentials and device permissions, and validate server push logs.

## Changelog

See the `CHANGELOG.md` (if present) or release notes in GitHub releases for version history.

## License

This project is released under — see `LICENSE` for details.

## Contact

Maintainer: ACodes3

For questions, open an issue on the repository or reach out via the contact in the GitHub profile.

---
