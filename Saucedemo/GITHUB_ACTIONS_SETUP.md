# GitHub Actions Setup for Saucedemo

## ✅ Zero Setup - Automated CI/CD!

GitHub Actions runs your tests automatically. No Jenkins needed!

## Quick Setup (2 minutes)

### Step 1: Add Sauce Labs Secrets to GitHub

1. Go to: **GitHub Repo** → **Settings** → **Secrets and variables** → **Actions**

2. Click **New repository secret** and add:

   **Secret 1: SAUCE_USERNAME**
   ```
   Name: SAUCE_USERNAME
   Value: oauth-nec.lakshmigoms-39399
   ```

   **Secret 2: SAUCE_ACCESS_KEY**
   ```
   Name: SAUCE_ACCESS_KEY
   Value: 523a086a-0403-40ec-afc9-eb2b90e3b2c0
   ```

### Step 2: That's It! 🎉

The workflow file (`.github/workflows/saucedemo.yml`) is already in your repo.

## What Happens Automatically

### Trigger Events:
- ✅ **On every push** to `main` or `playwright` branch
- ✅ **On every pull request**
- ✅ **Daily at 9 AM UTC** (scheduled run)

### What It Does:
```
1. Checkout code
2. Setup Node.js 18
3. Install dependencies (npm ci)
4. Install Playwright browsers
5. Run local tests (Chromium)
6. Run Sauce Labs tests (Cloud)
7. Upload reports as artifacts
8. Display test results
```

## View Test Results

### Option 1: GitHub Actions Tab
1. Go to repo → **Actions** tab
2. Click on the workflow run
3. See:
   - ✓ Step-by-step logs
   - ✓ Test results summary
   - ✓ Pass/fail status for each stage

### Option 2: Artifacts
1. Click the workflow run
2. Scroll down → **Artifacts** section
3. Download:
   - `playwright-report` (HTML report with screenshots)
   - `test-results` (JSON results)

### Option 3: Sauce Labs Dashboard
- https://app.eu-central-1.saucelabs.com/builds
- See video recordings and detailed metrics

## Example Workflow Run

```
✓ Checkout code
✓ Setup Node.js 18
✓ Install dependencies
✓ Install Playwright browsers
✓ Run local tests
  └─ 1 passed (2.5s)
✓ Run Sauce Labs tests
  └─ 1 passed (32s on Windows 10)
✓ Upload artifacts
✓ Publish test report
```

## Scheduled Runs

Tests run **daily at 9 AM UTC** automatically:
```yaml
schedule:
  - cron: '0 9 * * *'
```

You can change the time:
- `0 9 * * *` = 9 AM UTC daily
- `0 9 * * 1` = 9 AM UTC every Monday
- `0 */6 * * *` = Every 6 hours

## Display Status Badge

Add this to your **README.md**:

```markdown
[![Saucedemo Tests](https://github.com/LakshmiUI-29/PLAYWRIGHT/workflows/Saucedemo%20Automation%20Tests/badge.svg?branch=playwright)](https://github.com/LakshmiUI-29/PLAYWRIGHT/actions)
```

Shows: ✓ Passing or ✗ Failing

## Monitoring & Alerts

### GitHub Notifications:
- Default: Get notified of failures
- Settings → Notifications → Configure

### Email Alerts:
- GitHub sends email on workflow failure
- Configure: Profile → Notifications

### Slack Integration (Optional):
Add to workflow after test step:
```yaml
- name: Notify Slack
  if: failure()
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
```

## Advantages Over Jenkins

| Feature | GitHub Actions | Jenkins |
|---------|---|---|
| **Setup** | 2 minutes ✅ | Hours to install ❌ |
| **Cost** | Free ✅ | Server costs ❌ |
| **Maintenance** | None (GitHub) ✅ | Manual updates ❌ |
| **Logs** | GitHub UI ✅ | Jenkins UI ❌ |
| **Integrations** | GitHub native ✅ | Plugin heavy ❌ |
| **Reports** | Artifacts ✅ | HTML server ❌ |

## Troubleshooting

### Tests not running?
1. Check repo → **Actions** tab
2. Look for workflow errors
3. Verify secrets are added correctly

### Sauce Labs tests failing?
1. Click workflow run
2. Check "Run Sauce Labs tests" step
3. Verify SAUCE_USERNAME and SAUCE_ACCESS_KEY are set

### Missing artifacts?
1. Verify test files exist in `Saucedemo/`
2. Check `test-results/` directory is created
3. Ensure upload step runs: `if: always()`

## Advanced: Manual Trigger

Run tests manually anytime:
1. Go to **Actions** tab
2. Click "Saucedemo Automation Tests"
3. Click **Run workflow** button

## File Structure

```
.github/
└── workflows/
    └── saucedemo.yml          # ← GitHub Actions configuration
Saucedemo/
├── tests/
│   └── saucedemo.spec.ts      # Your tests
├── playwright.config.ts        # Local config
├── playwright-sauce.config.ts  # Cloud config
├── .sauce/config.yml          # Sauce Labs config
└── package.json
```

## Next Steps

1. ✅ Add Sauce Labs secrets (SAUCE_USERNAME, SAUCE_ACCESS_KEY)
2. ✅ Push `.github/workflows/saucedemo.yml` to GitHub
3. ✅ Go to **Actions** tab and watch first run
4. ✅ Download reports from artifacts
5. ✅ Share status badge in README

**You're all set! 🚀**

Tests now run automatically on every push!
