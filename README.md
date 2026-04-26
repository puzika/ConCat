# 💬 ConCat

**A full-stack real-time messaging platform built with React and NestJS.**

> ⚠️ **Project Status**: Currently in active development.
> **The backend repository is located at**: https://github.com/puzika/ConCat_server

- [x] Basic UI Layout
- [ ] Real-time Messaging 🚧 _In Progress_
- [ ] JWT Authentication ⏳ _Next Up_

### Local Installation:

1. clone the repository
2. clone the backend repository above
3. install dependencies pnpm install (or npm install)
4. start backend by running pnpm run start:dev
5. start client by running pnpm run dev

Authentication is currently in progress. To bypass the login screen and access the application dashboard, use the following test credentials:

- **Test User 1**: `pj@gmail.com`
- **Test User 2**: `tl@gmail.com`
- **Password**: Any character string

Also, at the moment the backend pulls data from a local database using PostgreSQL. So, in order to use the app, for now you're going to need to have a local postgres database populated with users.

### Features to be implemented

1. Bidirectional text messaging

- sending a message
- deleting a message (gets deleted for both users)
- editing a message

2. JWT Authentication with Passport.js
3. User search
4. User profile page
5. Editing profile
6. audio calls / video calls
7. attaching files
