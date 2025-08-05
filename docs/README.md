# HYPIQ Documentation

🐋 **Advanced Trading Platform Documentation**

This repository contains the official documentation for HYPIQ, built with [Docusaurus](https://docusaurus.io/) and powered by [Netlify CMS](https://www.netlifycms.org/) for easy content management.

## 🚀 Features

- **Modern Documentation**: Built with Docusaurus v3
- **Content Management**: Netlify CMS for non-technical editors
- **HYPIQ Branding**: Custom theme with whale logo and blue gradient
- **Dark Mode**: Default dark theme with light mode option
- **Responsive Design**: Mobile-friendly documentation
- **Search**: Built-in search functionality
- **Fast Loading**: Static site generation for optimal performance

## 🛠️ Tech Stack

- **Framework**: Docusaurus v3 with TypeScript
- **CMS**: Netlify CMS (Decap CMS)
- **Styling**: Custom CSS with HYPIQ branding
- **Deployment**: Vercel/Netlify with automatic builds
- **Domain**: docs.hypiq.xyz

## 📁 Project Structure

```
hypiq-docs/
├── docs/                 # Documentation content
│   ├── getting-started.md
│   ├── platform/         # Platform guides
│   ├── api/             # API documentation
│   ├── guides/          # User guides
│   └── faq.md
├── static/
│   ├── admin/           # Netlify CMS admin panel
│   └── img/             # Images and assets
├── src/
│   └── css/
│       └── custom.css   # HYPIQ custom styling
├── docusaurus.config.ts # Site configuration
└── sidebars.ts         # Navigation structure
```

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/hypiq-hl/hypiq-docs.git
cd hypiq-docs

# Install dependencies
npm install

# Start development server
npm start
```

The site will be available at `http://localhost:3000`

### Content Management

Access the CMS admin panel at `http://localhost:3000/admin` to edit content through a user-friendly interface.

## 📝 Content Editing

### For Developers

Edit Markdown files directly in the `docs/` folder:

```bash
docs/
├── getting-started.md     # Main landing page
├── platform/
│   ├── overview.md       # Platform overview
│   ├── features.md       # Feature documentation
│   └── trading.md        # Trading guides
├── api/
│   ├── authentication.md # API auth
│   ├── endpoints.md      # API endpoints
│   └── websocket.md      # WebSocket API
└── guides/
    ├── quick-start.md    # Quick start guide
    ├── advanced-trading.md # Advanced features
    └── risk-management.md # Risk management
```

### For Content Editors

1. Visit `docs.hypiq.xyz/admin`
2. Log in with your credentials
3. Edit content using the visual editor
4. Changes are automatically committed to GitHub
5. Site rebuilds and deploys automatically

## 🎨 Customization

### Branding

The site uses HYPIQ's brand colors and styling:

- **Primary Blue**: `#60a5fa`
- **Secondary Purple**: `#a78bfa`
- **Dark Background**: `#0f172a`
- **Font**: Inter

### Logo and Assets

Place custom assets in `static/img/`:

- `logo.svg` - Main logo
- `favicon.ico` - Site favicon
- `hypiq-social-card.jpg` - Social media preview

## 🚀 Deployment

### Automatic Deployment

The site automatically deploys when changes are pushed to the `main` branch.

### Manual Deployment

```bash
# Build the site
npm run build

# Test the build locally
npm run serve

# Deploy to production
npm run deploy
```

## 🔧 Configuration

### Site Configuration

Edit `docusaurus.config.ts` to modify:

- Site title and tagline
- Navigation menu
- Footer links
- SEO settings
- Plugin configuration

### CMS Configuration

Edit `static/admin/config.yml` to modify:

- Content collections
- Field types
- Authentication settings
- Media management

## 📱 Features

### Built-in Features

- **Search**: Full-text search across all documentation
- **Versioning**: Support for multiple documentation versions
- **Internationalization**: Multi-language support ready
- **SEO Optimized**: Meta tags, sitemaps, and structured data
- **Analytics**: Google Analytics integration ready

### Custom Features

- **HYPIQ Branding**: Custom theme with gradient effects
- **Dark Mode**: Optimized for dark theme usage
- **Responsive**: Mobile-first design
- **Fast Loading**: Optimized for performance

## 🤝 Contributing

### Content Contributors

1. Use the CMS admin panel at `/admin`
2. Or submit pull requests with Markdown changes
3. Follow the style guide for consistency

### Developers

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

### Style Guide

- Use clear, concise language
- Include code examples where relevant
- Add screenshots for UI features
- Follow Markdown best practices
- Test all links and references

## 📞 Support

- **Documentation Issues**: Create a GitHub issue
- **Content Questions**: Contact hello@hypiq.xyz
- **Technical Support**: Join our [Discord](https://discord.gg/hypiq)
- **Updates**: Follow [@hypiq_hl](https://x.com/hypiq_hl) on Twitter

## 📄 License

This documentation is proprietary to HYPIQ. All rights reserved.

---

**Built with ❤️ by the HYPIQ Team** 🐋

Visit [hypiq.xyz](https://hypiq.xyz) to join our waitlist!
