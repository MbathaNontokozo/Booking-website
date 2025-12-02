# GitHub Authentication Guide

## Step 1: Create a Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: `Booking Website Push`
4. Select expiration: Choose your preference (90 days, 1 year, or no expiration)
5. **Select scopes**: Check the `repo` checkbox (this gives full repository access)
6. Click **"Generate token"** at the bottom
7. **IMPORTANT**: Copy the token immediately - you won't be able to see it again!

## Step 2: Use the Token to Push

After you have your token, run this command in PowerShell:

```powershell
# When prompted for username, enter your GitHub username
# When prompted for password, paste your token (not your GitHub password)
git push -u origin main
```

## Alternative: Store Credentials (Optional)

To avoid entering credentials every time:

```powershell
# Configure Git Credential Manager
git config --global credential.helper manager-core
```

Then when you push, enter your token once and it will be saved.

## Security Note

- Never share your token
- Don't commit tokens to Git
- If you accidentally share a token, revoke it immediately on GitHub

