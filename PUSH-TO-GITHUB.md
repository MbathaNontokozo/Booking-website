# Push to GitHub - Quick Guide

## Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `booking-website` (or any name you prefer)
3. Choose **Public** or **Private**
4. **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

## Step 2: Copy Your Repository URL

After creating, GitHub will show you a URL like:
- `https://github.com/YOUR_USERNAME/booking-website.git`

## Step 3: Run These Commands

Open PowerShell in the `Booking-website` folder and run:

```powershell
# Add your GitHub repository as remote (replace with your actual URL)
git remote add origin https://github.com/YOUR_USERNAME/booking-website.git

# Rename branch to main (if not already)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Alternative: Using SSH (if you have SSH keys set up)

```powershell
git remote add origin git@github.com:YOUR_USERNAME/booking-website.git
git branch -M main
git push -u origin main
```

## Done! 🎉

Your code is now on GitHub. You can:
- View it at: `https://github.com/YOUR_USERNAME/booking-website`
- Deploy to Render using the `render.yaml` file
- Share it with others

