#!/bin/bash

# Script to push arcium-private-perps-standalone to GitHub
# Make sure you've created the repo on GitHub first!

REPO_NAME="arcium-private-perps-demo"
GITHUB_USER="Frankznation"  # Change this if your GitHub username is different

echo "🚀 Pushing to GitHub..."
echo ""
echo "📋 Make sure you've created the repo on GitHub first:"
echo "   1. Go to https://github.com/new"
echo "   2. Repository name: $REPO_NAME"
echo "   3. Make it Public"
echo "   4. DON'T initialize with README (we already have one)"
echo "   5. Click 'Create repository'"
echo ""
read -p "Press Enter after you've created the repo on GitHub..."

# Add remote and push
git remote add origin https://github.com/$GITHUB_USER/$REPO_NAME.git
git branch -M main
git push -u origin main

echo ""
echo "✅ Done! Your repo is at: https://github.com/$GITHUB_USER/$REPO_NAME"
