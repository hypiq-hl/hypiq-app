# HYPIQ Documentation - Docusaurus to GitBook Migration

This directory contains the migrated HYPIQ documentation from Docusaurus to GitBook format.

## What was migrated

✅ **Content Successfully Extracted:**
- Main documentation pages
- Platform overview and features
- API authentication documentation
- Getting started guide
- Quick start guide
- FAQ section

## File Structure

```
hypiq-docs-gitbook/
├── README.md                 # Main landing page (Welcome to HYPIQ)
├── SUMMARY.md               # GitBook table of contents
├── getting-started.md       # Getting started guide
├── faq.md                   # Frequently asked questions
├── platform/
│   ├── overview.md          # Platform overview
│   └── features.md          # Platform features
├── api/
│   └── authentication.md   # API authentication docs
├── guides/
│   └── quick-start.md       # Quick start guide
├── .gitbook.yaml           # GitBook configuration
├── book.json               # GitBook settings and plugins
└── package.json            # Node.js dependencies
```

## Setup and Usage

### Option 1: GitBook Cloud (Recommended)

1. Create a new GitBook space
2. Connect your GitHub repository
3. Import this directory structure
4. GitBook will automatically detect the `.gitbook.yaml` configuration

### Option 2: Local GitBook CLI

1. Install GitBook CLI:
   ```bash
   npm install -g gitbook-cli
   ```

2. Install dependencies:
   ```bash
   cd /var/www/hypiq-docs-gitbook
   npm install
   gitbook install
   ```

3. Serve locally:
   ```bash
   gitbook serve
   ```

4. Build for production:
   ```bash
   gitbook build
   ```

### Option 3: Modern GitBook (Legacy-free)

GitBook has evolved beyond the CLI tool. For modern usage:

1. Go to [gitbook.com](https://gitbook.com)
2. Create a new space
3. Import from Git (connect your repository)
4. Point to this directory

## Migration Notes

### What Changed

1. **File Format**: HTML → Markdown
2. **Navigation**: Docusaurus sidebar → GitBook SUMMARY.md
3. **Configuration**: `docusaurus.config.js` → `.gitbook.yaml` + `book.json`
4. **Assets**: Static files structure adapted for GitBook
5. **Styling**: GitBook's default theme (customizable)

### Content Quality

- Content was extracted using BeautifulSoup and html2text
- Some formatting may need manual adjustment
- Links and references were preserved where possible
- Anchor links (hash links) converted to standard markdown

### Recommended Next Steps

1. **Review Content**: Check each page for formatting issues
2. **Add Assets**: Include any missing images or files
3. **Customize Theme**: Modify `book.json` for custom styling
4. **Set Up Domain**: Configure custom domain in GitBook settings
5. **Enable Integrations**: Set up search, analytics, etc.

## Benefits of GitBook

✅ **Improved Features:**
- Better editor experience
- Built-in collaboration tools
- Advanced search functionality
- Better mobile experience
- Integrated commenting system
- Easy PDF export
- Git sync capabilities
- SEO optimizations

## Support

- GitBook Documentation: https://docs.gitbook.com/
- GitBook Community: https://community.gitbook.com/
- Original Docusaurus site reference: `/var/www/hypiq-docs/`

---

Migration completed on: $(date)
Migrated from: Docusaurus v3.8.1
Migrated to: GitBook format