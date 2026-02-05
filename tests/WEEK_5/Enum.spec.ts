import { test, expect } from '@playwright/test';

enum Environment {
    LOCAL = "LOCAL",
    DEVELOPMENT = "DEVELOPMENT",
    STAGING = "STAGING",
    PRODUCTION = "PRODUCTION"
}

function runTests(env: Environment): void {
    console.log("Running tests in environment:", env);
}

test('Run tests in LOCAL environment', async () => {
    runTests(Environment.LOCAL);
    expect(true).toBe(true); // simple assertion
});

test('Run tests in STAGING environment', async () => {
    runTests(Environment.STAGING);
    expect(true).toBe(true);
});
