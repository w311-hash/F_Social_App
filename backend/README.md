# Anglers Central

A social fishing application that connects anglers, tracks catches, manages crews, and rewards achievements.

## Architecture

- **Backend**: Node.js/Express API on Render
- **Frontend**: Flutter mobile app on Firebase Hosting
- **Database**: MongoDB Atlas
- **Real-time**: Socket.IO for notifications
- **Images**: Cloudinary CDN

## Project Structure

```
anglers_central/
├── backend/                 # Node.js/Express API
│   ├── config/             # Database and storage config
│   ├── controllers/        # Route handlers
│   ├── middleware/         # Auth and upload middleware
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── utils/              # Utility functions (badge engine)
│   ├── server.js           # Entry point
│   ├── package.json        # Dependencies
│   └── .env.example        # Environment template
│
└── frontend/               # Flutter mobile app
    ├── lib/
    │   ├── api/            # API clients
    │   ├── models/         # Data models
    │   ├── screens/        # UI screens
    │   ├── services/       # Business logic
    │   ├── widgets/        # Reusable components
    │   ├── assets/         # Images, badges
    │   └── main.dart       # Entry point
    ├── pubspec.yaml        # Dependencies
    └── .gitignore          # Git rules
```

## Features

### Authentication
- User registration with email/password
- JWT-based authentication
- Secure token storage

### User Profiles
- User information (name, email, photo)
- Badge system (achievements)
- Species statistics tracking
- Follow system

### Catches
- Log fishing catches with:
  - Species type
  - Weight and length
  - Location
  - Photo upload
  - Notes
- Public catch discovery
- Catch interactions (likes, comments)

### Crews
- Create and join fishing crews
- Crew-specific feeds
- Role-based permissions
- Crew invitations

### Social Features
- Follow other anglers
- View friend feeds
- Like and comment on catches
- Real-time notifications

### Gamification
- Badge achievements
- Species specialization tracking
- Leaderboards

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Sign in

### Users
- `GET /api/users/me` - Get profile
- `GET /api/public-profile/:id` - View public profile

### Catches
- `POST /api/catches` - Create catch
- `GET /api/catches` - Get user catches
- `GET /api/public-catches/:id` - Get public catches

### Feed
- `GET /api/feed` - Get feed (from followed users)

### Crews
- `POST /api/crews/create` - Create crew
- `POST /api/crews/invite/:crewId/:userId` - Invite member
- `POST /api/crews/accept/:crewId` - Accept invite
- `GET /api/crew-feed/:crewId` - Get crew feed

### Stats
- `GET /api/species-stats` - Get species statistics

## Deployment

See [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) for complete deployment instructions.

### Quick Start (Backend)

1. Set up environment variables (see `.env.example`)
2. Install dependencies: `npm install`
3. Start server: `npm start` (or `npm run dev` for development)

### Quick Start (Frontend)

1. Install Flutter SDK
2. Install dependencies: `flutter pub get`
3. Run app: `flutter run`

## Environment Variables

See `.env.example` for all required variables.

### Required Services
- **MongoDB Atlas** - Database
- **Cloudinary** - Image hosting
- **JWT Secret** - Token signing

## Technologies

### Backend
- Express.js - Web framework
- Mongoose - MongoDB ODM
- JWT - Authentication
- Socket.IO - Real-time communication
- Multer + Cloudinary - File uploads
- Bcrypt - Password hashing

### Frontend
- Flutter - Mobile framework
- Dart - Programming language
- HTTP - API requests
- Socket.IO Client - Real-time events
- Shared Preferences - Local storage
- Cached Network Image - Image caching

## Contributing

1. Clone repository
2. Create feature branch
3. Make changes
4. Test locally
5. Commit with clear messages
6. Push to GitHub
7. Create Pull Request

## License

ISC

## Contact

For questions or support, contact the development team.

---

**Anglers Central** - Connect, catch, and compete 🎣
