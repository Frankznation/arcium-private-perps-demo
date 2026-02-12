#!/bin/bash

echo "🚀 Deploying Arcium Private Perps to Vercel..."
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Deploy to Vercel
echo "🌐 Deploying..."
cd /Users/frankchinonso/arcium-private-perps-standalone
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo "📝 Your app should be live at the URL shown above"
echo ""
echo "💡 To update deployment:"
echo "   vercel --prod"
