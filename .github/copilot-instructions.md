# AI Assistant Instructions for Chat Application

## Project Architecture

This is a real-time chat application with a client-server architecture:

- **Frontend**: React + Vite application (in `/frontend`)
  - Uses Zustand for state management (`/frontend/src/store`)
  - Tailwind CSS + DaisyUI for styling
  - Socket.io client for real-time communication

- **Backend**: Node.js + Express application (in `/backend`)
  - MongoDB database with Mongoose ODM
  - Socket.io server for real-time messaging
  - JWT authentication with cookie-based session management
  - Cloudinary integration for image handling

## Key Integration Points

1. **Real-time Communication**
   - Socket.io handles real-time messaging in `backend/src/lib/socket.js`
   - User-socket mapping maintained in `userSocketMap` object
   - Frontend subscribes to messages in `frontend/src/store/useChatStore.js`

2. **State Management**
   - Zustand stores in `frontend/src/store/`:
     - `useAuthStore.js`: Authentication state
     - `useChatStore.js`: Messages and user selection
     - `useThemeStore.js`: UI theme preferences

3. **API Integration**
   - Axios instance configured in `frontend/src/lib/axios.js`
   - Backend routes defined in `backend/src/routes/`

## Development Workflow

1. **Running the Application**
   ```bash
   # Install dependencies
   npm install        # Root dependencies
   cd frontend && npm install
   cd ../backend && npm install

   # Development mode
   # Terminal 1 - Frontend
   cd frontend && npm run dev

   # Terminal 2 - Backend
   cd backend && npm run dev
   ```

2. **Build Process**
   ```bash
   npm run build     # Builds frontend and installs dependencies
   npm start        # Starts backend server
   ```

## Project Conventions

1. **State Management**
   - Use Zustand stores for global state
   - Socket subscriptions handled in store actions
   - Always unsubscribe from socket events on cleanup

2. **File Structure**
   - Components in `frontend/src/components/`
   - Pages in `frontend/src/Pages/`
   - Backend controllers follow RESTful patterns
   - Middleware in `backend/src/middleware/`

3. **Authentication**
   - JWT tokens stored in HTTP-only cookies
   - Protected routes use `auth.middleware.js`
   - User sessions managed via socket connections

When making changes, ensure real-time functionality remains intact by properly handling socket events and state updates.