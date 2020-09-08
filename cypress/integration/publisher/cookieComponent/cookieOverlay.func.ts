import { cookieBannerPageUrl,cookieOverlay } from '../../../utils/publisher/func.pageurl.util'

const SELECTORS  = {
   cookieNotificationWrapper: '.nr-cookie-notification-component',
   cookieNotificationCtaLink: '.nr-cookie-notification__cta-link',
   cookieNotificationCtaBtn: '.nr-cookie-notification__cta-button',
   cookieNotificationCtaWall: '.nr-cookie-notification__wall',
   navigationLinkFirst: '.nr-navigation__link:first',
   overlay: '.nr-overlay',
   overlayClose: '.nr-overlay .nr-overlay__close',
   cookiePreferencesInput: '.nr-cookie-preferences__input',
   cookiePreferencesCtaBtn: '.nr-cookie-preferences__cta-button',
   cookiePreferencesInputFirst: '.nr-cookie-preferences__input:first',
   cookiePreferencesSwitchFirst: '.nr-cookie-preferences__switch:first',
   cookiePreferencesSwitch: '.nr-cookie-preferences__switch',
   
} as const

context('CookieWall', () => {
   beforeEach(() => {
      cy.visit(cookieBannerPageUrl)
      cy.request(cookieOverlay).as('overlay')
   })

   it('Visits the site for the first time', () => {
      cy.get(SELECTORS.cookieNotificationWrapper)
         .should('be.visible')
         .should('have.css', 'top', '0px')

      cy.get(SELECTORS.cookieNotificationCtaLink)
         .should('be.visible')
         .contains('View Cookie preferences')

      cy.get(SELECTORS.cookieNotificationCtaBtn)
         .should('be.visible')
         .contains('Agree & Continue')

      cy.get(SELECTORS.cookieNotificationCtaWall).should('have.length', 1)
      cy.percySnapshot('Page is Disabled and cookie wall appears');
   })

   it('Verifies elements on cookie overlay', () => {
      cy.get(SELECTORS.cookieNotificationCtaLink).click()
        .get('@overlay').then(() => {
         cy.get(SELECTORS.overlay).find(SELECTORS.cookiePreferencesInput).should('have.length',2)
           .get(SELECTORS.overlayClose).should('have.length', 1)
           .get(SELECTORS.overlay).find(SELECTORS.cookiePreferencesCtaBtn).should('have.length',1)
         cy.percySnapshot('Cookie Overlay is opened');
        })
   })

   it('Verifies close button of cookie overlay', () => {
      cy.get(SELECTORS.cookieNotificationCtaLink).click()
        .get('@overlay').then(() => {
         cy.get(SELECTORS.overlayClose).should('have.length', 1).click()
         cy.percySnapshot('Cookie Overlay Closed');
        })
   })

   it('Toggles cookie sliders', () => {
      cy.get(SELECTORS.cookieNotificationCtaLink).click()
      cy.get('@overlay').then(() => {
         cy.get(SELECTORS.overlay).find(SELECTORS.cookiePreferencesInputFirst)
            .scrollIntoView({ easing: 'linear', duration: 1000 })
            .click({ force: true })
            .get(SELECTORS.overlay).find(SELECTORS.cookiePreferencesSwitchFirst).should(
            'be.visible')

         cy.get(SELECTORS.overlay).find(SELECTORS.cookiePreferencesInput).eq(1)
            .scrollIntoView({ easing: 'linear', duration: 1000 })
            .click({ force: true })

         cy.get(SELECTORS.overlay).find(SELECTORS.cookiePreferencesSwitch).eq(1).should(
            'be.visible')
      })
      cy.percySnapshot('Toggles Changed');
   })

   it('Changes performance cookie', () => {
      cy.get(SELECTORS.cookieNotificationCtaLink).click()
      cy.get('@overlay').then(() => {
         cy.get(SELECTORS.overlay).find(SELECTORS.cookiePreferencesInputFirst)
            .scrollIntoView({ easing: 'linear', duration: 1000 })
            .click({ force: true })

         cy.get(SELECTORS.overlay).find(SELECTORS.cookiePreferencesSwitchFirst).should(
            'be.visible')
         
         cy.percySnapshot('Performance cookie selected');
         cy.get(SELECTORS.overlay).find(SELECTORS.cookiePreferencesCtaBtn).click()
           .get(SELECTORS.cookieNotificationCtaWall).should('have.length', 0)
      })
      
   })

   it('Changes advertisement cookie', () => {
      cy.get(SELECTORS.cookieNotificationCtaLink).click()
      cy.get('@overlay').then(() => {
         cy.get(SELECTORS.overlay).find(SELECTORS.cookiePreferencesInput).eq(1)
            .scrollIntoView({ easing: 'linear', duration: 1000 })
            .click({ force: true })
         
         cy.percySnapshot('Advertisement cookie selected');

         cy.get(SELECTORS.overlay).find(SELECTORS.cookiePreferencesCtaBtn).click()
           .get(SELECTORS.cookieNotificationCtaWall).should('have.length', 0)
      })
   })

})
