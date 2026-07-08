# 🚀 Production Deployment Guide

## Prerequisites
- Node.js 18+
- PostgreSQL database (Supabase / Neon recommended)
- Google OAuth credentials
- PayPal developer account
- MUAPI key

## 1. Clone & Install
```bash
git clone <your-repo>
cd <your-repo>
npm install
```

## 2. Environment Variables
Copy `.env.example` → `.env` and fill in all values:

```bash
cp .env.example .env
```

### Critical variables:
| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL pooler URL (port 6543 for Supabase) |
| `DIRECT_URL` | PostgreSQL direct URL (port 5432, for migrations) |
| `NEXTAUTH_SECRET` | Random 32-char secret: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your production domain: `https://yourdomain.com` |
| `GOOGLE_CLIENT_ID` | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | From Google Cloud Console |
| `MUAPIAPP_API_KEY` | From muapi.ai |
| `NEXT_PUBLIC_ADMIN_EMAILS` | Comma-separated admin emails |
| `ADMIN_EMAILS` | Same as above (server-side) |

## 3. Database Setup
```bash
# Push schema to database
npm run db:push

# Seed categories
npm run db:seed
```

## 4. Build & Test
```bash
npm run build
npm run start
```

## 5. Deploy to Vercel

### Via CLI:
```bash
npm i -g vercel
vercel --prod
```

### Via Dashboard:
1. Import your GitHub repo on vercel.com
2. Add all environment variables in Project Settings → Environment Variables
3. Deploy

## 6. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (dev)
   - `https://yourdomain.com/api/auth/callback/google` (prod)

## 7. Admin Access
Add your email to `NEXT_PUBLIC_ADMIN_EMAILS` and `ADMIN_EMAILS` env vars.
Then visit `/admin` when logged in.

## 8. Troubleshooting

### Prisma: "Environment variable not found: DATABASE_URL"
→ Make sure `.env` file exists and `DATABASE_URL` is set

### NextAuth: "No secret provided"
→ Set `NEXTAUTH_SECRET` in your environment variables

### 401 on Admin routes
→ Add your email to `ADMIN_EMAILS` env var

### App Store empty
→ Run `npm run db:seed` to populate categories, then add apps via `/admin`
