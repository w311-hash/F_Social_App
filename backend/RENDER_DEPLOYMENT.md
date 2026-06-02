# Anglers Central - Backend Deployment Guide

## Overview
Anglers Central backend is a Node.js/Express API for a fishing social media application. It supports authentication, user profiles, catch logging, crews, and real-time notifications via Socket.IO.

## Deployment on Render

### Prerequisites
1. MongoDB Atlas account (free tier available)
2. Cloudinary account for image hosting (free tier available)
3. GitHub repository (already connected)
4. Render account

### Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Under "Security" → "Database Access", create a user
4. Under "Security" → "Network Access", add your Render IP or allow 0.0.0.0/0
5. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/?appName=appname`

### Step 2: Set Up Cloudinary

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for a free account
3. Navigate to the Dashboard
4. Copy your:
   - Cloud Name
   - API Key
   - API Secret

### Step 3: Create Render Service

1. Go to [Render](https://render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository (F_Social_App)
4. Fill in the configuration:
   - **Name**: anglers-central-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free (or Starter)

### Step 4: Configure Environment Variables

In Render Dashboard, go to your service → Environment and add:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=anglerscentral
JWT_SECRET=your_long_random_secret_key_here
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=production
```

### Step 5: Deploy

1. Click "Create Web Service"
2. Render will automatically deploy from GitHub
3. Monitor the build logs
4. Once deployed, you'll get a URL like: `https://anglers-central-backend.onrender.com`

### Step 6: Update Frontend API Config

In the Flutter app, update the socket and API URLs to use your Render backend URL:

```dart
// In frontend/lib/api/api_config.dart
static String get apiBaseUrl {
  if (kReleaseMode) {
    return 'https://anglers-central-backend.onrender.com/api';
  }
  // ... local development URLs
}
```

## Important Notes

- **Cold Starts**: Free Render services spin down after 15 minutes of inactivity. Consider upgrading to a paid plan for production
- **CORS**: Backend is configured to accept requests from Firebase Hosting and Render
- **Socket.IO**: Real-time features require the Render service to be running
- **Database**: Keep MongoDB Atlas free tier in mind for data limits

## Monitoring

After deployment:
1. Check backend health: `https://your-render-url.onrender.com/` (should return "ANGLERS CENTRAL API is running...")
2. Check logs in Render Dashboard for any errors
3. Test endpoints via Postman or similar tool

## Troubleshooting

**"Cannot connect to MongoDB"**
- Verify MONGO_URI is correct
- Check MongoDB Atlas Network Access whitelist includes Render IP

**"Socket connection failed"**
- Ensure CORS is properly configured
- Check that Socket.IO port (5000) is accessible

**"Image uploads failing"**
- Verify Cloudinary credentials
- Check Cloudinary upload presets if configured

## Next Steps

1. Deploy backend on Render
2. Update frontend API URLs
3. Deploy frontend on Firebase Hosting
4. Test login/register
5. Test feed and catch posting
