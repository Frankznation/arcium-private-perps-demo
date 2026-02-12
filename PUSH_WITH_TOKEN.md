# Push to GitHub with Authentication

The remote is already set up. You just need to push with authentication.

## Option 1: Push with Token in URL (One-time)

Replace `YOUR_TOKEN` with your GitHub Personal Access Token:

```bash
cd /Users/frankchinonso/arcium-private-perps-standalone
git push https://YOUR_TOKEN@github.com/Frankznation/arcium-private-perps-demo.git main
```

## Option 2: Push and Enter Credentials

Run this command - it will prompt for username and password:

```bash
cd /Users/frankchinonso/arcium-private-perps-standalone
git branch -M main
git push -u origin main
```

When prompted:
- **Username**: `Frankznation` (or your GitHub username)
- **Password**: Use your GitHub Personal Access Token (NOT your GitHub password)

## Option 3: Configure Git Credential Helper

```bash
git config --global credential.helper osxkeychain
git push -u origin main
```

Then enter your token when prompted.

## Get GitHub Token

If you don't have a token:
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name it: "arcium-perps-push"
4. Select scope: `repo`
5. Click "Generate token"
6. Copy the token (you won't see it again!)
