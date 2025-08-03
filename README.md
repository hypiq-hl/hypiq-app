# 🐋 HYPIQ - Whale Trading Prediction Platform

**The first platform to bet on whale trading outcomes with full wallet integration and real-time P&L tracking.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://hypenn-1cyoxwela-baris-projects-49ea2d32.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-HYPIQ-blue?style=for-the-badge&logo=github)](https://github.com/quickwebsitetr/HYPIQ)

## ✨ Features

### 🔗 **Complete Wallet Integration**
- **MetaMask Connection**: Seamless Web3 wallet integration
- **Real-time Balance**: Starting balance of $382.35 (demo)
- **Persistent State**: Wallet connection and balance persist across sessions

### 💰 **Advanced Betting System**
- **Interactive Betting Modal**: Custom amount input with validation
- **Quick Amount Buttons**: $25, $50, $100, Max options
- **Real-time Balance Deduction**: Instant balance updates
- **Minimum Bet Validation**: $1.00 minimum

# 🚀 HYPIQ - AI-Powered Trading Platform

<div align="center">
  <img src="public/hypiq-logo.jpeg" alt="HYPIQ Logo" width="200"/>
  <h3>Revolutionary AI-Powered Trading Platform</h3>
  <p>
    <a href="https://hypiq.xyz">🌐 Live Demo</a> •
    <a href="#features">✨ Features</a> •
    <a href="#tech-stack">🛠️ Tech Stack</a> •
    <a href="#deployment">🚀 Deployment</a>
  </p>
</div>

---

## 🎯 Overview

**HYPIQ** is a cutting-edge AI-powered trading platform that democratizes professional trading strategies through advanced machine learning algorithms and intuitive user experience. Our platform combines real-time market analysis, automated trading, and comprehensive portfolio management in one seamless interface.

**🌐 Live Site:** [https://hypiq.xyz](https://hypiq.xyz)  
**📧 Contact:** hello@hypiq.xyz

---

## ✨ Features

### 🤖 **AI-Powered Trading Engine**
- **Smart Algorithms**: Advanced ML models for market pattern recognition
- **Automated Risk Management**: Dynamic stop-loss and take-profit systems
- **Portfolio Optimization**: AI-driven asset allocation and rebalancing
- **Sentiment Analysis**: Real-time news and social media integration

### 📊 **Advanced Analytics Dashboard**
- **Real-time Market Data**: Live price feeds and technical indicators
- **Performance Tracking**: Comprehensive portfolio analytics
- **Backtesting Engine**: Historical strategy validation
- **Custom Indicators**: Build and deploy proprietary indicators

### 🔒 **Enterprise-Grade Security**
- **Bank-Level Encryption**: End-to-end data protection
- **Multi-Factor Authentication**: Enhanced account security
- **Regulatory Compliance**: Adheres to financial industry standards
- **Complete Audit Trail**: Full transaction and activity logging

### 🎨 **Modern User Experience**
- **Responsive Design**: Optimized for all devices and screen sizes
- **Real-time Notifications**: Instant alerts for trades and market events
- **Customizable Interface**: Personalized dashboard layouts
- **Educational Resources**: Built-in tutorials and learning materials

---

## 🛠️ Tech Stack

### **Frontend**
- **⚛️ Next.js 14** - React framework with App Router
- **📘 TypeScript** - Type-safe development
- **🎨 Tailwind CSS** - Utility-first styling
- **🎭 Framer Motion** - Smooth animations
- **📈 Recharts** - Interactive data visualization

### **Backend & Database**
- **🔥 Next.js API Routes** - Serverless API endpoints
- **🗄️ Supabase** - PostgreSQL with real-time subscriptions
- **📧 Nodemailer** - Email automation system
- **🔐 NextAuth.js** - Authentication management

### **Infrastructure & Deployment**
- **🌐 Nginx** - Reverse proxy and load balancing
- **⚡ PM2** - Process management
- **🔒 Let's Encrypt** - SSL certificate management
- **☁️ VPS Deployment** - Ubuntu server hosting

### **Development Tools**
- **📦 npm/yarn** - Package management
- **🔧 ESLint** - Code linting
- **💅 Prettier** - Code formatting
- **🧪 Jest** - Testing framework

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Git

### **Installation**

```bash
# 1. Clone the repository
git clone https://github.com/hypiq-hl/hypiq-website.git
cd hypiq-website

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Run development server
npm run dev
```

### **Environment Variables**

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email Configuration
GMAIL_USER=your_gmail_address
GMAIL_APP_PASSWORD=your_app_password

# Next.js Configuration
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

---

## 📁 Project Structure

```
hypiq-website/
├── 📂 src/
│   ├── 📂 app/                    # Next.js App Router
│   │   ├── 📂 api/               # API routes
│   │   │   └── 📂 waitlist/      # Email waitlist endpoint
│   │   ├── 📂 landing/           # Landing page
│   │   ├── 📂 positions/         # Trading positions
│   │   └── 📄 layout.tsx         # Root layout
│   ├── 📂 components/            # Reusable components
│   │   ├── 📂 ui/               # UI components
│   │   └── 📂 sections/         # Page sections
│   └── 📂 lib/                  # Utility libraries
├── 📂 public/                   # Static assets
├── 📄 next.config.js           # Next.js configuration
├── 📄 tailwind.config.js       # Tailwind CSS config
└── 📄 package.json             # Dependencies
```

---

## 🔌 API Endpoints

### **Waitlist Management**
```typescript
// Add user to waitlist
POST /api/waitlist/
Body: { email: string }
Response: { message: string, data: User }
```

### **User Authentication**
```typescript
// User registration
POST /api/auth/register
Body: { email: string, password: string }

// User login
POST /api/auth/login
Body: { email: string, password: string }
```

### **Trading Operations**
```typescript
// Get user positions
GET /api/positions
Headers: { Authorization: Bearer <token> }

// Execute trade
POST /api/trade
Body: { symbol: string, quantity: number, type: 'buy' | 'sell' }
```

---

## 🌐 Deployment

### **Production Build**
```bash
# Build for production
npm run build

# Start production server
npm start
```

### **Server Deployment (Ubuntu/VPS)**

```bash
# 1. Install Node.js and PM2
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install -g pm2

# 2. Clone and setup project
git clone https://github.com/hypiq-hl/hypiq-website.git
cd hypiq-website
npm install
npm run build

# 3. Start with PM2
pm2 start npm --name "hypiq" -- start
pm2 save
pm2 startup

# 4. Setup Nginx reverse proxy
sudo apt install nginx
sudo nano /etc/nginx/sites-available/hypiq

# 5. Enable SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### **Nginx Configuration**
```nginx
server {
    server_name yourdomain.com www.yourdomain.com;
    
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
}
```

2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 **Support**

For support, questions, or feature requests:
- Open an issue on [GitHub](https://github.com/quickwebsitetr/HYPIQ/issues)
- Contact: [Your Contact Information]

---

**Built with ❤️ for the DeFi community** 