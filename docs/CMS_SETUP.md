# 🔐 HYPIQ Docs CMS Setup Guide

## 🎯 Production CMS Security

HYPIQ Docs CMS sadece **GitHub repository collaborators** tarafından erişilebilir.

## 🚀 GitHub OAuth App Setup

### 1️⃣ GitHub OAuth App Oluştur

1. **GitHub Settings** → **Developer settings** → **OAuth Apps**
2. **New OAuth App** tıkla
3. **Application details:**
   ```
   Application name: HYPIQ Docs CMS
   Homepage URL: https://docs.hypiq.finance
   Authorization callback URL: https://docs.hypiq.finance/admin/
   ```

### 2️⃣ Environment Variables

Production server'da `.env` dosyasına ekle:
```bash
# GitHub OAuth for CMS
GITHUB_CLIENT_ID=Iv23liiuJkWK3ZFCIfPr
GITHUB_CLIENT_SECRET=72b70d64ebc5571f6727776f04086886a706ae83
GITHUB_APP_ID=1731756

# Site Configuration
SITE_URL=https://docs.hypiq.finance
NODE_ENV=production
```

### 3️⃣ Netlify Identity (Alternative)

Eğer Netlify'da deploy edeceksen:
1. **Netlify Dashboard** → **Site Settings** → **Identity**
2. **Enable Identity** 
3. **Registration** → **Invite only**
4. **External providers** → **GitHub** enable et

## 🔧 Local Development

Local'de çalışırken `test-repo` backend kullan:

```yaml
# config.yml - Local development
backend:
  name: test-repo
local_backend: true
```

Proxy server başlat:
```bash
npx netlify-cms-proxy-server
```

## 🌐 Production Deployment

Production'da GitHub backend kullan:

```yaml
# config.yml - Production
backend:
  name: github
  repo: hypiq-hl/hypiq-docs
  branch: main
  auth_type: pkce
```

## 🛡️ Security Features

### ✅ **Sadece Collaborators:**
- GitHub repo'ya write access olanlar
- Otomatik permission kontrolü
- Commit history tracking

### ✅ **PKCE Authentication:**
- Secure OAuth flow
- No client secret exposure
- Modern security standard

### ✅ **Branch Protection:**
- Main branch protected
- Pull request workflow
- Review requirements

## 🎯 Access Control

### **Admin Access:**
1. **Repository Collaborators**: Write/Admin permission
2. **Organization Members**: Repo access gerekli
3. **External Contributors**: Invite-only

### **User Flow:**
1. `/admin/` sayfasına git
2. **Login with GitHub** tıkla
3. GitHub OAuth authorize et
4. Repo access kontrol edilir
5. ✅ Access granted / ❌ Access denied

## 🔄 Deployment Workflow

### **Content Updates:**
1. CMS'de değişiklik yap
2. Otomatik commit oluşur
3. Build trigger edilir
4. Site güncellenir

### **Git Integration:**
- Her CMS değişikliği = Git commit
- Commit author = GitHub user
- Full version control
- Rollback capability

## 🚨 Troubleshooting

### **Access Denied:**
- GitHub repo collaborator değilsin
- OAuth app callback URL yanlış
- Repository private ve access yok

### **Local Development:**
- `test-repo` backend kullan
- Proxy server çalıştır
- `local_backend: true` aktif

## 📞 Support

Sorun yaşarsan:
1. GitHub permissions kontrol et
2. OAuth app settings kontrol et  
3. Browser console logs bak
4. Network tab'de auth requests kontrol et

---

**🐋 HYPIQ Docs CMS - Secure & Professional** ✨
