// @ts-check
const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  use: { baseURL: 'http://127.0.0.1:8766' },
  webServer: {
    command: 'python3 -m http.server 8766',
    url: 'http://127.0.0.1:8766',
    reuseExistingServer: true,
    timeout: 120000,
  },
});
