import { adaptivePageUrl } from '../../../utils/publisher/func.pageurl.util'

const SELECTORS  = {
   adaptiveImg: '.nr-adaptive-image__img',
   adaptiveImgBtn: '.nr-adaptive-image__btn',
   overlay: '.nr-overlay',
   overlayImg: '.nr-adaptive-image__overlay--img',
   overlayClose: '.nr-overlay__close'
} as const

context('Adaptive Image', () => {
   beforeEach(() => {
      cy.visit(adaptivePageUrl)
   })

   it('Visits the site for the first time', () => {
      cy.get(SELECTORS.adaptiveImg).eq(0).should('be.visible')
      cy.percySnapshot('Adaptive Image is visible');
   })

   it('Check if hover effect works fine', () => {
      cy.get(SELECTORS.adaptiveImg).eq(0).should('have.attr','title','With hover effect').click()
      cy.percySnapshot('Hover effect is working fine')
   })

   it('Check if open/close fullscreen works fine', () => {
      cy.get(SELECTORS.adaptiveImgBtn).eq(0).should('be.visible').click()
        .get(SELECTORS.overlay).find(SELECTORS.overlayImg).should('be.visible')
      cy.percySnapshot('Overlay is visible')
        .get(SELECTORS.overlayClose).should('be.visible').click()
        .get(SELECTORS.adaptiveImg).eq(0).should('be.visible')
      cy.percySnapshot('overlay close is working fine')
   })

   it('Hover effect doesnt appear when it is switched off', () => {
      cy.get(SELECTORS.adaptiveImg).eq(1).should('have.attr','title','Without hover effect').click()
      cy.percySnapshot('hover effect with switchoff')
   })
})
