# Vercel Deployment Fix

## Issues Found

1. **Branch Mismatch**: Vercel is deploying from `arcium-rtg-replica` branch, but local is on `main`
2. **pnpm Detection**: Vercel detected `pnpm-lock.yaml` but project uses `npm` (package-lock.json)
3. **Peer Dependency Warnings**: Some dependency conflicts

## Fixes

### 1. Fix Branch Issue

**Option A: Deploy from main branch**
- Go to Vercel Dashboard → Project Settings → Git
- Change production branch to `main`
- Or delete the `arcium-rtg-replica` branch if not needed

**Option B: Create/Update arcium-rtg-replica branch**
```bash
cd /Users/frankchinonso/arcium-private-perps-standalone
git checkout -b arcium-rtg-replica
git push origin arcium-rtg-replica
```

### 2. Remove pnpm-lock.yaml (if exists)

If there's a `pnpm-lock.yaml` file in the repo:
```bash
git rm pnpm-lock.json  # Remove if exists
git commit -m "Remove pnpm-lock.yaml, use npm"
git push
```

### 3. Update Vercel Configuration

Create/update `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

### 4. Fix Peer Dependency Warnings

Update `package.json` to resolve conflicts:
- Check which packages have peer dependency issues
- Update to compatible versions
- Or add `overrides` field in package.json

## Quick Fix Commands

```bash
cd /Users/frankchinonso/arcium-private-perps-standalone

# Ensure package.json exists
# Ensure vercel.json exists

# Remove pnpm-lock if exists
rm -f pnpm-lock.yaml

# Commit and push
git add .
git commit -m "Fix Vercel deployment: use npm, update config"
git push origin main

# If deploying from arcium-rtg-replica branch:
git checkout -b arcium-rtg-replica
git push origin arcium-rtg-replica
```

## Vercel Dashboard Settings

1. Go to Project Settings → General
2. **Build & Development Settings**:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
   - Root Directory: `./` (or leave empty)

3. **Git Settings**:
   - Production Branch: `main` (or `arcium-rtg-replica` if you prefer)
   - Auto-deploy: Enabled

## Expected Build Output

After fixes, build should:
- ✅ Use npm (not pnpm)
- ✅ Install dependencies successfully
- ✅ Build Next.js app
- ✅ Deploy successfully

## Troubleshooting

**If build still fails:**
1. Check Vercel build logs for specific errors
2. Ensure all files are committed and pushed
3. Verify `package.json` has correct scripts
4. Check Node.js version (should be 18+)

**Common Issues:**
- Missing `package.json` → Create it
- Missing `next.config.js` → Create it
- Wrong branch → Update Vercel settings
- pnpm vs npm → Remove pnpm-lock.yaml, use npm
