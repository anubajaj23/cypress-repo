/// <reference types="cypress" />

describe('A11y Success/failure', () => {
    beforeEach(() => {
        cy.visit('https://bp-com-test1.navitas.bpglobal.com')
        cy.injectAxe()
    })
  
    it('Accessibility check', () => {
        cy.get('.nr-navigation__logo-img').should('have.attr', 'alt');
    })
    
    // Basic usage
    it('Has no detectable a11y violations on load', () => {
        // Test the page at initial load
        cy.checkA11y()
    })
    
    it('Has no detectable a11y violations on load (filtering to only include critical impact violations)', () => {
        // Test on initial load, only report and assert for critical impact items
        cy.checkA11y(null, {
            includedImpacts: ['critical']
        })
    })
    
    // Basic usage after interacting with the page
    it('Has no a11y violations after button click', () => {
        // Interact with the page, then check for a11y issues
        cy.get('.nr-cookie-notification__cta-button').should('be.visible').click()
        cy.checkA11y()
    })
  })