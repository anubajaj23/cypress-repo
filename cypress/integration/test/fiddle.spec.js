// TODO: Need to verify its usecase
// loads TypeScript definition for Cypress
// and "cy.runExample" custom command
/// <reference types="@cypress/fiddle" />

const helloTest = {
    html: `
      <div>Welcome to the world of BP</div>
    `,
    test: `
      cy.get('div').should('have.text', 'Welcome to the world of BP')
    `
  }
  
  it('tests hello', () => {
    cy.runExample(helloTest)
  })