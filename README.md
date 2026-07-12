# ConCat

A full-stack real-time messaging application inspired by Telegram. The project focuses on secure authentication, real-time communication, and a scalable frontend architecture using modern web technologies.

🌐 **Live Demo:** https://your-domain.com

## Backend

The backend source code is available here:

➡️ https://github.com/puzika/ConCat_server

## Features

- 🔐 JWT authentication with Access & Refresh Tokens
- 🛡️ Refresh Token Rotation with replay attack detection
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
- Redux Toolkit
- TanStack Query
- Axios
- Socket.IO Client
- React Hook Form
- Zod
- Feature-Sliced Design (FSD)

### Backend

- Node.js
- Express
- Socket.IO
- JWT
- Zod

## Authentication

The application implements a production-style authentication flow:

- Access Tokens for API authorization
- Refresh Tokens stored in Secure, HttpOnly cookies
- Automatic Access Token renewal
- Refresh Token Rotation
- Replay attack detection
- Session revocation using JWT IDs (JTIs)

## Security

- HttpOnly Cookies
- Secure Cookies
- SameSite=Lax Cookies
- Runtime payload validation
- Refresh Token Rotation
- Replay attack prevention
- Automatic session invalidation

## Future Improvements

- Group chats
- Read receipts
- Typing indicators
- File uploads
- Voice messages
- Push notifications
- End-to-End Encryption

## License

This project was built for educational and portfolio purposes.
