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
      cy.get(SELECTORS.adaptiveImg)
         .should('be.visible')
         .trigger('mouseover')
   })

   it('Check if fullscreen works fine', () => {
      cy.get(SELECTORS.adaptiveImgBtn)
         .should('be.visible').click()
      cy.get(SELECTORS.overlay).find(SELECTORS.overlayImg).should('be.visible')
   })

   it('Close full screen works fine', () => {
      cy.get(SELECTORS.overlayClose)
         .should('be.visible').click()
      cy.get(SELECTORS.overlayClose).find(SELECTORS.overlayImg).should('be.visible')
   })

   it('Hover effect doesnt appear when it is switched off', () => {
      cy.get(SELECTORS.overlayClose)
         .should('be.visible').click()
      cy.get(SELECTORS.overlay).find(SELECTORS.overlayImg).should('be.visible')
   })
})
