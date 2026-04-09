# Deployment Guide

## Automatic Deployment (GitHub Actions)

Every time you push to the `main` branch, your site will automatically build and deploy to Cloudflare Pages.

### Setup Steps:

1. Push this code to a GitHub repository
2. Go to your GitHub repository → Settings → Secrets and variables → Actions
3. Add these secrets:
   - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

### Getting Your Credentials:

**Cloudflare API Token:**
1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Use the "Edit Cloudflare Workers" template or create a custom token with:
   - Account.Cloudflare Pages: Edit
4. Copy the token and add it to GitHub secrets

**Cloudflare Account ID:**
1. Go to https://dash.cloudflare.com
2. Select your domain
3. Scroll down on the Overview page - your Account ID is on the right sidebar
4. Copy it and add it to GitHub secrets

## Manual Deployment

Run this command anytime you want to publish changes:

```bash
npm run publish
```

This will:
1. Build your site
2. Deploy to Cloudflare Pages

**Note:** You need `CLOUDFLARE_API_TOKEN` set as an environment variable for manual deployment.

## First Time Setup

Make sure your Cloudflare Pages project is named "headhunters". If you want a different name, update the `--project-name` in:
- `package.json` (publish script)
- `.github/workflows/deploy.yml` (deploy job)
