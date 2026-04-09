pipeline {
    agent any
    
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
    }
    
    environment {
        SAUCE_USERNAME = credentials('sauce-username')
        SAUCE_ACCESS_KEY = credentials('sauce-access-key')
        NODE_ENV = 'test'
        WORKSPACE_PATH = '${WORKSPACE}/Saucedemo'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo "✓ Code checked out successfully"
                sh 'cd ${WORKSPACE_PATH} && pwd'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh '''
                    cd ${WORKSPACE_PATH}
                    echo "Installing Node dependencies for Saucedemo..."
                    npm ci  # Clean install
                    npx playwright install  # Install browser binaries
                '''
            }
        }
        
        stage('Run Local Tests') {
            steps {
                sh '''
                    cd ${WORKSPACE_PATH}
                    echo "Running Saucedemo tests locally..."
                    npx playwright test \
                        --project=chromium \
                        --reporter=html,json
                '''
            }
            post {
                always {
                    publishHTML([
                        reportDir: '${WORKSPACE_PATH}/playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Saucedemo - Local Test Report',
                        keepAll: true
                    ])
                }
            }
        }
        
        stage('Run Sauce Labs Tests') {
            steps {
                sh '''
                    cd ${WORKSPACE_PATH}
                    echo "Running Saucedemo tests on Sauce Labs..."
                    npx saucectl run
                '''
            }
            post {
                always {
                    echo "✓ Sauce Labs test run completed"
                }
            }
        }
        
        stage('Archive Results') {
            steps {
                sh '''
                    cd ${WORKSPACE_PATH}
                    echo "Archiving Saucedemo test results..."
                    tar -czf playwright-report.tar.gz playwright-report/ || true
                '''
                archiveArtifacts artifacts: 'Saucedemo/playwright-report.tar.gz', allowEmptyArchive: true
                archiveArtifacts artifacts: 'Saucedemo/test-results/**/*.json', allowEmptyArchive: true
            }
        }
    }
    
    post {
        always {
            echo "✓ Saucedemo Pipeline execution completed"
        }
        success {
            echo "✓ All Saucedemo tests passed!"
        }
        failure {
            echo "✗ Saucedemo tests failed! Check reports above"
        }
    }
}
