# Deploying to Render

This guide will help you deploy the Booking website to Render.

## Prerequisites

1. A Render account (sign up at https://render.com)
2. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Using render.yaml (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   - Make sure all files are committed and pushed

2. **Create a new Render Blueprint**
   - Go to https://dashboard.render.com
   - Click "New +" → "Blueprint"
   - Connect your repository
   - Render will automatically detect `render.yaml` and create both services

3. **Set Environment Variables**
   - For the **frontend** service, add:
     - `VITE_API_URL`: Set this to your backend service URL (e.g., `https://booking-backend.onrender.com`)
   - Both services will automatically get `NODE_ENV=production` and `PORT=10000`

4. **Deploy**
   - Render will automatically build and deploy both services
   - The backend will be available at `https://booking-backend.onrender.com`
   - The frontend will be available at `https://booking-frontend.onrender.com`

### Option 2: Manual Deployment

#### Deploy Backend

1. **Create a new Web Service**
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect your repository

2. **Configure Backend Service**
   - **Name**: `booking-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && node server.js`
   - **Region**: Choose closest to your users

3. **Set Environment Variables**
   - `NODE_ENV`: `production`
   - `PORT`: `10000` (Render will override this, but good to have)

#### Deploy Frontend

1. **Create a new Web Service**
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect the same repository

2. **Configure Frontend Service**
   - **Name**: `booking-frontend`
   - **Environment**: `Node`
   - **Build Command**: `cd frontend/frontend && npm install && npm run build`
   - **Start Command**: `cd frontend/frontend && npm run preview`
   - **Region**: Same as backend

3. **Set Environment Variables**
   - `VITE_API_URL`: `https://booking-backend.onrender.com` (use your actual backend URL)
   - `NODE_ENV`: `production`
   - `PORT`: `10000`

## Important Notes

- **Free Tier Limitations**: Render's free tier spins down services after 15 minutes of inactivity. The first request after spin-down may take 30-60 seconds.

- **CORS**: The backend already has CORS enabled, so it should work with the frontend on a different domain.

- **Environment Variables**: Make sure to set `VITE_API_URL` in the frontend service to point to your backend URL.

- **Database**: Currently, the app uses in-memory storage. Bookings will reset when the backend restarts. For production, consider adding a database (PostgreSQL, MongoDB, etc.).

## Testing Deployment

1. Visit your frontend URL
2. Try selecting a resource and date
3. Make a test booking
4. Verify the booking appears in the list

## Troubleshooting

- **Frontend can't connect to backend**: Check that `VITE_API_URL` is set correctly in the frontend service environment variables
- **Build fails**: Check the build logs in Render dashboard
- **CORS errors**: Ensure backend has CORS enabled (already configured)
- **Services not starting**: Check logs in Render dashboard for errors

## Updating Deployment

Simply push changes to your repository, and Render will automatically rebuild and redeploy your services.



