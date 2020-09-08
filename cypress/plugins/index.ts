// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
// cypress-dotenv is used for managing multiple environement files with '.'
// initialize percyHealthCheck task

let percyHealthCheck = require('@percy/cypress/task')

const dotenvPlugin = require('cypress-dotenv')

module.exports = (on, config) => {
  on("task", percyHealthCheck);
  config = dotenvPlugin(config)
  return config
}
