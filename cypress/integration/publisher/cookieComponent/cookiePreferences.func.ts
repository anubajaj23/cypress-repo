import { cookiePreferencesPageUrl } from '../../../utils/publisher/func.pageurl.util'

const SELECTORS  = {
   cookieNotificationCtaWall: '.nr-cookie-notification__wall',
   navigationLinkFirst: '.nr-navigation__link:first',
   cookiePreferencesInput: '.nr-cookie-preferences__input',
   cookiePreferencesCtaBtn: '.nr-cookie-preferences__cta-button'   
} as const

context('CookieWall', () => {
   beforeEach(() => {
      cy.visit(cookiePreferencesPageUrl)
      cy.fixture('cookieFunc').as('cNSpec')
   })

   it('Verifies hover state of CTA button', () => {
      cy.get(SELECTORS.cookiePreferencesCtaBtn).should('be.visible').invoke('attr','style', 'background-color:rgba(0,127,0,.8)')
   })

   it('Verifies changes on Cookie Preferences page', () => {
      cy.get(SELECTORS.navigationLinkFirst).should('be.visible')
        .get(SELECTORS.cookieNotificationCtaWall).should('have.length', 0)

      cy.get(SELECTORS.cookiePreferencesInput).eq(0).scrollIntoView({
         easing: 'linear',
         duration: 1000,
      })
      cy.get(SELECTORS.cookiePreferencesInput).eq(1).scrollIntoView({
         easing: 'linear',
         duration: 1000,
      })
   })

   it('Switches off all cookies and verifies component', () => {
      cy.get('@cNSpec')
        .then(cNSpec => { 
         cy.setCookie(cNSpec.r_func, 'true')
           .setCookie(cNSpec.r_perf, 'true')
           .setCookie(cNSpec.r_adv, 'true')
         cy.visit(cookiePreferencesPageUrl)
           .get(SELECTORS.cookieNotificationCtaWall).should('have.length', 0)
        })
   })
})
