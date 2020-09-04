// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

declare global {
   namespace Cypress {
      interface Chainable<Subject> {
         login() : Chainable<Element>;
         createPage(url: string, pageName: string): Chainable<Element>;
         deletePage(url: string, pageName: string): Chainable<Element>;
         beforeHook(): Chainable<Element>;
         deleteHook(): Chainable<Element>;
      }
      
      interface JQuery {
         fixtures(...any): any; 
      }
   }
}

let username = Cypress.env('username'),
   password = Cypress.env('password')

Cypress.Commands.add('login', () => {
   cy.get('#username').type(username)
   cy.get('#password').type(password, {log: false})
   cy.get('#submit-button').click()
})


export {}
