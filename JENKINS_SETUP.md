# Jenkins Pipeline Setup Guide

## 1. Prerequisites
- Jenkins server with Node.js plugin installed
- Git plugin for source control
- Email notification plugin (optional)

## 2. Store Sauce Labs Credentials in Jenkins

### Step-by-Step:
1. Go to **Jenkins Dashboard** → **Manage Jenkins** → **Manage Credentials**
2. Click **Global** → **Add Credentials**
3. Create two secret text credentials:

   **Credential 1: Sauce Username**
   - Kind: Secret text
   - Secret: `oauth-nec.lakshmigoms-39399`
   - ID: `sauce-username`

   **Credential 2: Sauce Access Key**
   - Kind: Secret text
   - Secret: `523a086a-0403-40ec-afc9-eb2b90e3b2c0`
   - ID: `sauce-access-key`

## 3. Create Jenkins Pipeline Job

### Via UI:
1. **New Item** → Enter job name (e.g., "Saucedemo-Playwright-Tests")
2. Select **Pipeline**
3. Under **Pipeline** section:
   - Definition: **Pipeline script from SCM**
   - SCM: **Git**
   - Repository URL: `https://github.com/your-repo/Saucedemo.git`
   - Branch: `*/main` (or your default branch)
   - Script Path: `Jenkinsfile`

### Via Code (create `Jenkinsfile` in repo root):
- Git will automatically detect the Jenkinsfile
- Jenkins runs pipeline directly from SCM

## 4. Configure Build Triggers

### Option A: Poll SCM (check for changes periodically)
```
Poll SCM: H/15 * * * *  # Run every 15 minutes
```

### Option B: GitHub/GitLab Webhook (recommended)
- Repository settings → Add webhook pointing to Jenkins
- Triggers job on every push/PR

## 5. Pipeline Stages Explained

| Stage | Purpose |
|-------|---------|
| **Checkout** | Clones repository |
| **Install Dependencies** | npm ci + browser install |
| **Lint Check** | Code quality checks |
| **Local Tests** | Run tests on Jenkins agent |
| **Sauce Labs Tests** | Run tests on cloud |
| **Archive Results** | Save reports as artifacts |

## 6. View Test Results

After build completes:
1. **Local Tests Report** - Click "Playwright Report - Local"
2. **Sauce Labs Dashboard** - Check https://app.eu-central-1.saucelabs.com/builds
3. **Console Output** - See full execution logs
4. **Artifacts** - Download test reports

## 7. Advanced Configuration

### Parallel Execution (multiple OS/browsers)
```groovy
parallel(
    'Chrome': { sh 'npx playwright test --project=chromium' },
    'Firefox': { sh 'npx playwright test --project=firefox' },
    'Safari': { sh 'npx playwright test --project=webkit' }
)
```

### Slack Notifications
```groovy
post {
    failure {
        slackSend(
            color: 'danger',
            message: "Tests failed: ${env.BUILD_URL}"
        )
    }
    success {
        slackSend(
            color: 'good',
            message: "All tests passed!"
        )
    }
}
```

### Email Notifications
```groovy
post {
    always {
        emailext(
            subject: "Build ${env.BUILD_NUMBER}: ${currentBuild.result}",
            body: "Check console output at ${env.BUILD_URL}",
            to: "${env.CHANGE_AUTHOR_EMAIL}"
        )
    }
}
```

## 8. Performance Tips

### Use npm ci instead of npm install
```groovy
npm ci  # Installs exact versions from package-lock.json
npm install  # Installs latest compatible versions
```

### Cache Dependencies (optional)
```groovy
def cacheDir = "/var/cache/jenkins/playwright"
sh "npm ci --prefer-offline --cache ${cacheDir}"
```

## 9. Troubleshooting

### Tests timeout on Jenkins
- Increase timeout in Jenkinsfile: `timeout(time: 45, unit: 'MINUTES')`
- Check Jenkins agent has sufficient resources

### Credentials not working
- Verify credential IDs match in Jenkinsfile
- Check Jenkins has permission to access credentials

### Playwright browsers not found
- Run `npx playwright install` (included in pipeline)
- Add `@playwright/test` to dependencies

## 10. Complete Workflow

```
Developer pushes code
    ↓
GitHub webhook triggers Jenkins
    ↓
Jenkins pulls latest code
    ↓
Installs dependencies
    ↓
Runs local tests
    ↓
Runs Sauce Labs tests
    ↓
Generates reports
    ↓
Send notifications
    ↓
Archive artifacts (30 days)
```

## 11. Quick Commands for Testing

```bash
# Test pipeline locally (requires Jenkins installed)
docker run -d -p 8080:8080 jenkins/jenkins:latest

# Validate Jenkinsfile syntax
curl -X POST -F "jenkinsfile=<Jenkinsfile" http://localhost:8080/pipeline-model-converter/validate
```
