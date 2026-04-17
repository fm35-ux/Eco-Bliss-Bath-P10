import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "7uo5g6",
  allowCypressEnv: true,

  env: {
    apiUrl: "http://localhost:8081",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:4200",
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    // Configuration du reporter Mochawesome
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
    }
  },
});
