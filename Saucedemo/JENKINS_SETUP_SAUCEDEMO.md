# Jenkins Pipeline Setup for Saucedemo Only

## Quick Start

### 1. Jenkins Job Configuration

**Job Name:** `Saucedemo-Automation`  
**Type:** Pipeline

#### In Jenkins UI:
1. **New Item** → Enter: `Saucedemo-Automation`
2. Select: **Pipeline**
3. Under **Pipeline** section:
   - Definition: **Pipeline script from SCM**
   - SCM: **Git**
   - Repository URL: `https://github.com/LakshmiUI-29/PLAYWRIGHT.git`
   - Branch: `*/playwright`
   - Script Path: `Saucedemo/Jenkinsfile` ✅ (point to Saucedemo folder)

### 2. Store Sauce Labs Credentials

**Manage Jenkins** → **Manage Credentials** → **Global** → **Add Credentials**

**Credential 1: sauce-username**
```
Kind: Secret text
Secret: oauth-nec.lakshmigoms-39399
ID: sauce-username
```

**Credential 2: sauce-access-key**
```
Kind: Secret text
Secret: 523a086a-0403-40ec-afc9-eb2b90e3b2c0
ID: sauce-access-key
```

### 3. Build Trigger (Choose One)

#### Option A: Poll SCM
```
Poll SCM: H/15 * * * *   # Every 15 minutes
```

#### Option B: GitHub Webhook (Recommended)
- Go to GitHub repo settings
- Webhooks → Add webhook
- Payload URL: `http://your-jenkins-url/github-webhook/`
- Events: Push events
- Active: ✓

### 4. Jenkins Pipeline Stages

```
Checkout
    ↓
Install Dependencies (npm ci + playwright install)
    ↓
Run Local Tests (Chromium)
    ↓
Run Sauce Labs Tests (Cloud execution)
    ↓
Archive Results (HTML reports + JSON)
```

### 5. View Test Results

After job completes:

| Result | Location |
|--------|----------|
| **Local Tests** | Job page → "Saucedemo - Local Test Report" |
| **Sauce Labs** | https://app.eu-central-1.saucelabs.com/builds |
| **Artifacts** | Job page → Artifacts → Download reports |
| **Console** | Job logs with full execution details |

## Pipeline Configuration Details

### Working Directory
The Jenkinsfile uses:
```groovy
WORKSPACE_PATH = '${WORKSPACE}/Saucedemo'
```

All commands run from the `Saucedemo` folder to avoid conflicts with other projects.

### Environment Variables
```groovy
SAUCE_USERNAME = credentials('sauce-username')       # From Jenkins secrets
SAUCE_ACCESS_KEY = credentials('sauce-access-key')   # From Jenkins secrets
NODE_ENV = 'test'
```

### Build Timeout
```groovy
timeout(time: 30, unit: 'MINUTES')
```

Adjustable if tests take longer.

## Troubleshooting

### Issue: Tests timeout
**Solution:** Increase timeout in Jenkinsfile
```groovy
timeout(time: 45, unit: 'MINUTES')  # Increase to 45 minutes
```

### Issue: Credentials not found
**Check:**
1. Credentials exist in Jenkins
2. Credential IDs match Jenkinsfile:
   - `sauce-username`
   - `sauce-access-key`
3. Jenkins job has permission to access credentials

### Issue: Node/npm not found
**Solution:** Install Node.js plugin
- Manage Jenkins → Plugin Manager
- Search: "NodeJS"
- Install & restart Jenkins

### Issue: Playwright browsers not found
**Solution:** Already handled in pipeline
```bash
npx playwright install
```

## Metrics & Reports

The pipeline generates:
- ✓ Local test HTML report (with screenshots)
- ✓ JSON test results (for CI/CD integration)
- ✓ Sauce Labs video recordings
- ✓ Test duration metrics
- ✓ Pass/fail counts

## Next Steps

1. ✅ Push Jenkinsfile to GitHub
2. ✅ Create Jenkins job pointing to Saucedemo/Jenkinsfile
3. ✅ Add Sauce Labs credentials
4. ✅ Trigger first build
5. ✅ View results

## Useful Commands

```bash
# Test locally before Jenkins
cd Saucedemo
npx playwright test                    # Local tests
npx saucectl run                       # Sauce Labs tests

# Validate Jenkinsfile syntax
curl -X POST -F "jenkinsfile=<Jenkinsfile" \
  http://localhost:8080/pipeline-model-converter/validate
```

## Jenkins Job Logs Example

```
✓ Code checked out successfully
✓ Installing Node dependencies for Saucedemo...
✓ Running Saucedemo tests locally...
  1 passed (2.5s)
✓ Running Saucedemo tests on Sauce Labs...
  Building...
  Uploading...
  1 passed (32s)
✓ Saucedemo Pipeline execution completed
✓ All Saucedemo tests passed!
```
