# Frontend Deployment Guide

## Vercel Deployment Commands

```bash
# Deploy to production
cd /Users/hello/Work/My\ Work/ABRLab/edtech-frontend
npx vercel deploy --prod --scope amitbiswas1992s-projects

# Force redeploy (clears cache)
npx vercel deploy --prod --scope amitbiswas1992s-projects --force
```

## Environment Variables (Vercel)

```bash
# Set env vars
npx vercel env add NEXT_PUBLIC_API_URL production --scope amitbiswas1992s-projects
# Value: https://edtech-backend-five.vercel.app
```

### Required Environment Variables
| Variable | Value | Notes |
|----------|-------|-------|
| NEXT_PUBLIC_API_URL | `https://edtech-backend-five.vercel.app` | Backend API URL |

## URLs
- **Production:** https://edtech-frontend-inky.vercel.app
- **GitHub:** https://github.com/amit-biswas-1992/edtech-frontend

## Test Accounts
| Role | Email | Password |
|------|-------|----------|
| Service Provider | admin@abccoaching.bd | Admin123 |
| Student | rahim@student.com | Student123 |
