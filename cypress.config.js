const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "wdsdt6",
  e2e: {
    baseUrl: "https://infact5-prod-staging-2.herokuapp.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});