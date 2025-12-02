# Quick Deploy Guide for Render

## 🚀 Quick Start

### Step 1: Push to Git
```bash
git add .
git commit -m "Prepare for Render deployment"
git push
```

### Step 2: Deploy on Render

#### Option A: Using Blueprint (Easiest)
1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub/GitLab/Bitbucket repository
4. Render will auto-detect `render.yaml` and create both services
5. **Important**: After deployment, go to the frontend service settings and add:
   - Environment Variable: `VITE_API_URL` = `https://your-backend-name.onrender.com`
6. Redeploy the frontend service

#### Option B: Manual Setup

**Backend Service:**
1. New → Web Service
2. Connect repository
3. Settings:
   - **Name**: `booking-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Environment**: Node

**Frontend Service:**
1. New → Web Service  
2. Connect same repository
3. Settings:
   - **Name**: `booking-frontend`
   - **Root Directory**: `frontend/frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run preview`
   - **Environment**: Node
   - **Environment Variables**:
     - `VITE_API_URL` = `https://booking-backend.onrender.com` (your backend URL)

### Step 3: Get Your URLs
- Backend: `https://booking-backend.onrender.com`
- Frontend: `https://booking-frontend.onrender.com`

### Step 4: Update Frontend Environment Variable
After backend deploys, update `VITE_API_URL` in frontend service to match your backend URL, then redeploy frontend.

## ✅ Verify Deployment
1. Visit frontend URL
2. Select a resource and date
3. Make a test booking
4. Check if it appears in the list

## 📝 Notes
- Free tier services spin down after 15 min inactivity
- First request after spin-down may take 30-60 seconds
- Bookings are stored in memory (will reset on restart)



