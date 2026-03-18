# DIT Coding Club Website

Next.js frontend for the DIT Coding Club. Uses Firebase (Firestore) for announcements, talks, meetings, and hall of fame data.

## Stack

- Next.js 16, React 19
- Tailwind CSS 4
- Firebase Admin (Firestore)
- Radix UI, Framer Motion

## Setup

1. Install dependencies (npm, yarn, or bun):

   ```bash
   bun install
   ```

2. Create a `.env` file with:
   - `FIREBASE_PRIVATE_KEY_ID`
   - `FIREBASE_PRIVATE_KEY`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_CLIENT_ID`
   - `ADMIN_EMAIL` (optional)

> [!NOTE]
> These can be found on the `#website` channel on our Discord server.

3. Run dev server:

   ```bash
   bun run dev
   ```

## Scripts

| Command          | Description             |
| ---------------- | ----------------------- |
| `bun run dev`    | Dev server (Turbopack)  |
| `bun run build`  | Production build        |
| `bun run start`  | Start production server |
| `bun run lint`   | Run ESLint              |
| `bun run format` | Format with Prettier    |

## Structure

- `app/` – Next.js App Router pages (home, talks, schedule, announcements, hall-of-fame, etc.)
- `components/` – UI and page components
- `server/` – Server actions that read from Firestore
- `firebase/server.ts` – Firebase Admin init and Firestore client
- `types/` – Shared TypeScript types
