#!/bin/bash

# HYPIQ App Production Deployment Script
# Deploy hypiq-app to production on prod.hypiq.finance with nginx auth

echo "🚀 Starting HYPIQ App production deployment..."

# 1. Stop existing application
echo "⏹️  Stopping existing application..."
pm2 stop hypiq-app-prod 2>/dev/null || echo "No existing app to stop"

# 2. Build the application
echo "🔨 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Aborting deployment."
    exit 1
fi

# 3. Install production dependencies
echo "📦 Installing production dependencies..."
npm ci --only=production

# 4. Start with PM2
echo "🎯 Starting application with PM2 on port 3004..."
pm2 start ecosystem.config.js

# 5. Test nginx configuration
echo "🔧 Testing nginx configuration..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "🔄 Reloading nginx..."
    sudo systemctl reload nginx
else
    echo "❌ Nginx configuration error!"
    exit 1
fi

# 6. Save PM2 configuration
echo "💾 Saving PM2 configuration..."
pm2 save

# 7. Show status
echo "📊 Current PM2 status:"
pm2 list

echo "✅ Production deployment completed!"
echo "🌐 Site available at: https://prod.hypiq.finance"
echo "🔒 Login credentials:"
echo "   Username: hypiq-admin" 
echo "   Password: hyp1q-pred1ct1ion@!markets!"
echo ""
echo "⚠️  Note: This site is protected with nginx basic authentication"
echo "   Other domains (hypiq.finance, docs.hypiq.finance) are NOT affected"
