# Push to GitHub - Step by Step

Since you don't have `gh` CLI installed, follow these steps:

## Option 1: Manual GitHub Creation + Git Push

### Step 1: Create Repository on GitHub
1. Go to https://github.com/new
2. Repository name: `arcium-private-perps-demo`
3. Description: "Interactive demo for Arcium Private Perps - Private Perpetuals Trading Platform"
4. Make it **Public**
5. **DO NOT** check "Initialize with README" (we already have files)
6. Click **"Create repository"**

### Step 2: Push Your Code
Run these commands:

```bash
cd /Users/frankchinonso/arcium-private-perps-standalone

# Add GitHub remote (replace Frankznation with your GitHub username if different)
git remote add origin https://github.com/Frankznation/arcium-private-perps-demo.git

# Push to GitHub
git branch -M main
git push -u origin main
```

If it asks for authentication, use your GitHub Personal Access Token as the password.

## Option 2: Use the Script

```bash
cd /Users/frankchinonso/arcium-private-perps-standalone
chmod +x push-to-github.sh
./push-to-github.sh
```

## After Pushing

Once pushed, you can:
1. **Deploy to Vercel**: Import the repo at https://vercel.com
2. **View on GitHub**: https://github.com/Frankznation/arcium-private-perps-demo

## Need GitHub Token?

If git push asks for credentials:
1. Go to https://github.com/settings/tokens
2. Generate new token (classic)
3. Select `repo` scope
4. Use token as password when pushing
