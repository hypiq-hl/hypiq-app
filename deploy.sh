#!/bin/bash

# HYPIQ Deployment Script
# Deploy to 116.203.66.246 with domain hypiq.xyz

SERVER="116.203.66.246"
DOMAIN="hypiq.xyz"
WEB_ROOT="/var/www/$DOMAIN"

echo "🚀 Starting HYPIQ deployment..."

# 1. Upload static files
echo "📤 Uploading files to server..."
rsync -avz --delete out/ root@$SERVER:$WEB_ROOT/

# 2. Create nginx config
echo "⚙️  Creating nginx configuration..."
ssh root@$SERVER "cat > /etc/nginx/sites-available/$DOMAIN << 'EOF'
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    root $WEB_ROOT;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control \"public, immutable\";
    }
    
    # Handle client-side routing
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    
    # Security headers
    add_header X-Frame-Options \"SAMEORIGIN\" always;
    add_header X-Content-Type-Options \"nosniff\" always;
    add_header X-XSS-Protection \"1; mode=block\" always;
}
EOF"

# 3. Enable site and restart nginx
echo "🔄 Enabling site and restarting nginx..."
ssh root@$SERVER "
    ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
    nginx -t && systemctl reload nginx
"

echo "✅ Deployment completed!"
echo "🌐 Site should be available at: http://$DOMAIN"
echo ""
echo "Next steps:"
echo "1. Point your domain DNS to $SERVER"
echo "2. Setup SSL with: certbot --nginx -d $DOMAIN -d www.$DOMAIN"
