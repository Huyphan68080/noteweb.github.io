# Note App - Project Instructions

## Project Overview
A progressive web application for note-taking built with React, Node.js, Express, and MongoDB. Features smooth UI/UX animations, admin authentication, and cloud storage via MongoDB Atlas.

## Technology Stack
- **Frontend**: React, React Router, Framer Motion, Axios
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)

## Key Features
- ✨ Smooth animations and scroll effects
- 📝 Create, edit, delete notes
- 🏷️ Categorize and tag notes
- 🔍 Search functionality
- 🎨 Color customization
- 📌 Pin important notes
- 🔐 Admin authentication with JWT
- 📱 Fully responsive design
- 🌐 Cloud storage with MongoDB

## Setup Instructions

### Backend
```bash
cd backend
npm install
npm start
```
- Server runs on http://localhost:5000
- MongoDB connection: Auto-configured from .env

### Frontend
```bash
cd frontend
npm install
npm start
```
- App runs on http://localhost:3000
- Auto-connects to backend API

## Default Admin Credentials
- Username: HuyPhan
- Password: Huyphan19082008

## Project Structure
```
noteapp/
├── backend/          # Express server & API
├── frontend/         # React application
└── README.md         # Documentation
```

## Important Files
- Backend: `backend/server.js` - Main server
- Frontend: `frontend/src/App.js` - Main app component
- Auth: `frontend/src/context/AuthContext.js` - Authentication logic
- Database: Uses MongoDB Atlas for cloud storage

## Development Tips
- Backend auto-reloads with `npm run dev`
- Frontend hot-reloads automatically
- Check browser console for errors
- Check terminal for backend errors
- Network tab shows API calls

## Deployment Notes
- Change JWT_SECRET before production
- Set proper MongoDB Atlas IP whitelist
- Configure CORS for production domain
- Build frontend: `npm run build`

## Common Issues & Solutions
1. **Connection refused**: Ensure backend is running
2. **CORS errors**: Check backend CORS config
3. **Auth failed**: Clear localStorage and re-login
4. **MongoDB error**: Verify connection string in .env
