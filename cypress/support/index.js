// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// Alternatively you can use CommonJS syntax:
// require('./commands')


import '@applitools/eyes.cypress/commands'
import '@cypress/fiddle'
import 'cypress-axe'

import './commands'
import './createPage'

// Including code coverage file
/// <reference types="cypress" />
before(() => {
    // we need to reset the coverage when running
    // in the interactive mode, otherwise the counters will
    // keep increasing every time we rerun the tests
    cy.task('resetCoverage', { isInteractive: Cypress.config('isInteractive') })
  })
  
  afterEach(() => {
    // save coverage after each test
    // because the entire "window" object is about
    // to be recycled by Cypress before next test
    cy.window().then(win => {
      if (win.__coverage__) {
        cy.task('combineCoverage', win.__coverage__)
      }
    })
  })
  
  after(() => {
    // when all tests finish, lets generate the coverage report
    cy.task('coverageReport')
  })