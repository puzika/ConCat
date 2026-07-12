# ConCat

A full-stack real-time messaging application inspired by Telegram. The project focuses on secure authentication, real-time communication, and a scalable frontend architecture using modern web technologies.

🌐 **Live Demo:** https://concat-fiqu.onrender.com/

Feel free to create a new account and explore the application.

## Backend

The backend source code is available here:

➡️ https://github.com/puzika/ConCat_server

## Features

- 🔐 JWT authentication with Access & Refresh Tokens
- 🔄 Refresh Token Rotation
- 🛡️ Replay attack detection and session invalidation
- 🍪 Secure, HttpOnly, SameSite=Lax cookies
- ⚡ Automatic Access Token refresh using Axios interceptors
- 🔄 Race-condition-safe token refresh mechanism
- 💬 Real-time messaging with Socket.IO
- ✏️ Send, edit, delete, and reply to messages
- 🚀 Optimistic UI updates with TanStack Query
- 📦 Client-side state management with Redux Toolkit
- ✅ Client and server validation using Zod
- 🏗️ Feature-Sliced Design (FSD) architecture

## Tech Stack

### Frontend

- React
- TypeScript
- Styled-components
- React Router
- Redux Toolkit
- TanStack Query
- Axios
- Socket.IO Client
- React Hook Form
- Zod
- Feature-Sliced Design (FSD)

### Backend

- Nestjs
- Socket.IO
- JWT
- Passport.js
- Zod
- Prisma
- PostgreSQL

## Authentication

The authentication system includes:

- Access Tokens for API authorization
- Refresh Tokens stored in Secure, HttpOnly cookies
- Automatic Access Token renewal
- Refresh Token Rotation
- Replay attack detection
- Session revocation using JWT IDs (JTIs)

## Security

- Secure, HttpOnly, SameSite=Lax cookies
- Refresh Token Rotation
- Replay attack detection
- Runtime payload validation
- Session revocation via JWT IDs (JTIs)

## Architecture

- Feature-Sliced Design (FSD) frontend architecture
- REST API for authentication and data fetching
- Socket.IO for real-time communication
- TanStack Query for server state management
- Redux Toolkit for client-side UI state

## Future Improvements

- Scheduled cleanup of expired/used refresh tokens
- File attachments
- Audio and video calls (simple-peer)
