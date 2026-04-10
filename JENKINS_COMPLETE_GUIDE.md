# Complete Jenkins Setup for Saucedemo

## Part 1: Install Jenkins

### Option A: Docker (Easiest & Recommended)

```bash
# Pull and run Jenkins
docker run -d -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  --name jenkins \
  jenkins/jenkins:lts

# Get initial admin password
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword

# Access: http://localhost:8080
```

### Option B: Homebrew (macOS)

```bash
# Install
brew install jenkins-lts

# Start service
brew services start jenkins-lts

# Access: http://localhost:8080

# View logs
brew services info jenkins-lts
```

### Option C: Linux (Ubuntu/Debian)

```bash
# Add Jenkins repository
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'

# Install Java and Jenkins
sudo apt-get update
sudo apt-get install openjdk-17-jre jenkins

# Start service
sudo systemctl start jenkins

# Access: http://localhost:8080
```

---

## Part 2: Initial Jenkins Setup

### Step 1: Unlock Jenkins
1. Go to: `http://localhost:8080`
2. Get admin password from terminal output
3. Paste in "Unlock Jenkins" page
4. Click **Continue**

### Step 2: Customize Jenkins
1. Select: **Install suggested plugins** (recommended)
2. Wait for plugins to install (~5 minutes)

### Step 3: Create Admin User
1. Enter username, password, email
2. Click **Save and Continue**
3. Confirm Jenkins URL: `http://localhost:8080`
4. Click **Save and Finish**

### Step 4: Start Using Jenkins
1. Click **Start using Jenkins**
2. You're now on the Jenkins dashboard

---

## Part 3: Install Required Plugins

### Go to: **Manage Jenkins** → **Plugin Manager**

#### Search and install:
1. **NodeJS** - For Node.js/npm support
2. **HTML Publisher** - For HTML reports
3. **Git** - For Git integration (usually pre-installed)
4. **Pipeline** - For Jenkinsfile support (usually pre-installed)

**Install without restart** → Restart Jenkins when convenient

---

## Part 4: Configure Credentials

### Add Sauce Labs Secrets

1. Go to: **Manage Jenkins** → **Manage Credentials**
2. Click **System** → **Global credentials**
3. Click **Add Credentials** (top left)

#### Create Credential 1: sauce-username
```
Kind: Secret text
Scope: Global
Secret: oauth-nec.lakshmigoms-39399
ID: sauce-username
Description: Sauce Labs Username
Click: Create
```

#### Create Credential 2: sauce-access-key
```
Kind: Secret text
Scope: Global
Secret: 523a086a-0403-40ec-afc9-eb2b90e3b2c0
ID: sauce-access-key
Description: Sauce Labs Access Key
Click: Create
```

---

## Part 5: Create Jenkins Job

### Step 1: Create New Job
1. Click **New Item** (top left)
2. Enter Job name: **Saucedemo-Automation**
3. Select: **Pipeline**
4. Click **OK**

### Step 2: Configure Pipeline
1. Under **Pipeline** section:
   - **Definition**: Select **Pipeline script from SCM**

2. **SCM**: Select **Git**
   ```
   Repository URL: https://github.com/LakshmiUI-29/PLAYWRIGHT.git
   Branch: */playwright
   Script Path: Saucedemo/Jenkinsfile ✓
   ```

3. Click **Save**

### Step 3: Add Build Trigger (Choose One)

#### Option A: GitHub Webhook (Recommended)
1. Go to your GitHub repo
2. Go to: **Settings** → **Webhooks** → **Add webhook**
3. Payload URL: `http://your-jenkins-url/github-webhook/`
4. Content type: `application/json`
5. Events: Select **Push events** and **Pull requests**
6. Active: ✓
7. Click **Add webhook**

Then in Jenkins job:
- Go to **Configure**
- Check: **GitHub hook trigger for GITScm polling**
- Click **Save**

#### Option B: Poll SCM (Simple)
In Jenkins job:
- Go to **Configure**
- Check: **Poll SCM**
- Schedule: `H/15 * * * *` (every 15 minutes)
- Click **Save**

---

## Part 6: Run Your First Build

### Manual Trigger:
1. Go to **Saucedemo-Automation** job
2. Click **Build Now**
3. Watch the build in progress (blue circle)

### View Console Output:
1. Click the build number (e.g., `#1`)
2. Click **Console Output**
3. Watch real-time logs

---

## Part 7: View Test Results

After build completes:

### Local Test Report:
1. Go to job → Last build
2. Click **Saucedemo - Local Test Report**
3. View screenshots, timeline, videos

### Test Artifacts:
1. Go to job → Last build
2. Scroll down → **Artifacts**
3. Download:
   - `playwright-report.tar.gz` (unzip for HTML)
   - `test-results/*.json`

### Sauce Labs Results:
Check: https://app.eu-central-1.saucelabs.com/builds

---

## Part 8: Build Pipeline Execution

When you trigger a build, Jenkins executes:

```
├── Checkout
│   └─ Clones from GitHub (playwright branch)
│
├── Install Dependencies
│   ├─ npm ci (clean install)
│   └─ npx playwright install (browsers)
│
├── Run Local Tests
│   └─ npx playwright test (Chromium)
│   └─ Generates: playwright-report/
│
├── Run Sauce Labs Tests
│   └─ npx saucectl run (Cloud Windows 10)
│   └─ Check: https://app.eu-central-1.saucelabs.com/builds
│
└── Archive Results
    ├─ playwright-report.tar.gz
    └─ test-results/*.json
```

---

## Part 9: Troubleshooting

### Problem: Build fails - "npm not found"
**Solution:**
1. Go to **Manage Jenkins** → **Tools**
2. Under **NodeJS**, click **Add NodeJS**
3. Name: `nodejs`
4. Version: `18.x` or `20.x`
5. Save

Then in Jenkinsfile, add:
```groovy
tools {
    nodejs 'nodejs'
}
```

### Problem: "Pipeline script from SCM not available"
**Solution:**
1. Check Pipeline plugin is installed
2. Go to **Manage Jenkins** → **Plugin Manager**
3. Search: "Pipeline"
4. Install: **Pipeline: Declarative** (if missing)
5. Restart Jenkins

### Problem: Credentials not working
**Solution:**
1. Verify credential IDs in Jenkins match Jenkinsfile:
   - `sauce-username`
   - `sauce-access-key`
2. Test credentials:
   - Go to job
   - Click **Configure**
   - Check credentials dropdown shows your secrets

### Problem: GitHub webhook not triggering builds
**Solution:**
1. Go to GitHub repo → **Settings** → **Webhooks**
2. Click the webhook
3. Scroll down → **Recent Deliveries**
4. Check if "200" response (success)
5. If error, check Jenkins URL is accessible from internet

### Problem: Tests timeout
**Solution:**
In Jenkinsfile, increase:
```groovy
timeout(time: 45, unit: 'MINUTES')  // Was 30
```

---

## Part 10: Jenkins Maintenance

### Backup Jenkins Data
```bash
# Docker
docker exec jenkins tar czf /var/jenkins_home/backup.tar.gz /var/jenkins_home

# Extract backup
docker cp jenkins:/var/jenkins_home/backup.tar.gz ./
tar xzf backup.tar.gz
```

### Update Jenkins
```bash
# Docker (pull new image)
docker pull jenkins/jenkins:lts
docker stop jenkins
docker rm jenkins
docker run -d -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  --name jenkins \
  jenkins/jenkins:lts

# Homebrew
brew upgrade jenkins-lts
```

### View Jenkins Logs
```bash
# Docker
docker logs jenkins

# Homebrew
log stream --level debug --predicate 'process == "java"'
```

---

## Part 11: Best Practices

✓ **Do:**
- Use GitHub webhooks for auto-trigger
- Store credentials in Jenkins, not .env
- Archive test reports
- Set build timeout
- Monitor build history
- Schedule regular runs

✗ **Don't:**
- Commit .env to GitHub
- Use plaintext credentials
- Run infinite build loops
- Ignore build failures
- Skip test reports

---

## Part 12: Jenkins Job Configuration Summary

```
Job Name: Saucedemo-Automation
Type: Pipeline
SCM: Git
Repository: https://github.com/LakshmiUI-29/PLAYWRIGHT.git
Branch: */playwright
Jenkinsfile: Saucedemo/Jenkinsfile
Trigger: GitHub webhook (or Poll SCM every 15 min)
Timeout: 30 minutes
Credentials: sauce-username, sauce-access-key
```

---

## Quick Command Reference

```bash
# Check Jenkins is running
curl http://localhost:8080

# View Jenkins logs (Docker)
docker logs jenkins -f

# Restart Jenkins (Docker)
docker restart jenkins

# Stop Jenkins (Homebrew)
brew services stop jenkins-lts

# Start Jenkins (Homebrew)
brew services start jenkins-lts
```

---

## What You Have Now

✅ Saucedemo automation tests  
✅ Playwright local execution  
✅ Sauce Labs cloud execution  
✅ Jenkins pipeline (Jenkinsfile)  
✅ GitHub Actions workflow  
✅ Full CI/CD setup  

**Choose:**
- **Jenkins** → Self-hosted control, full customization
- **GitHub Actions** → Free, integrated, zero setup

Both work great! 🚀
