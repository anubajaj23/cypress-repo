import { homePageUrl,cookieOverlay } from '../../../utils/publisher/func.pageurl.util'

const SELECTORS  = {
   cookieNotificationWrapper: '.nr-cookie-notification-component',
   cookieNotificationCtaLink: '.nr-cookie-notification__cta-link',
   cookieNotificationCtaBtn: '.nr-cookie-notification__cta-button',
   cookieNotificationCtaWall: '.nr-cookie-notification__wall',
   navigation: '.nr-navigation',
   navigationLinkFirst: '.nr-navigation__link:first',
   cookiePreferencesInput: '.nr-cookie-preferences__input',
   overlay: '.nr-overlay',
   overlayClose: '.nr-overlay .nr-overlay__close',
   cookiePreferencesCtaBtn: '.nr-cookie-preferences__cta-button',
   cookiePreferencesInputFirst: '.nr-cookie-preferences__input:first',
   cookiePreferencesSwitchFirst: '.nr-cookie-preferences__switch:first',
   cookiePreferencesSwitch: '.nr-cookie-preferences__switch',
} as const

context('CookieWall', () => {
   beforeEach(() => {
      cy.visit(homePageUrl)
      cy.fixture('cookieFunc').as('cNSpec')
      cy.request(cookieOverlay).as('overlay')
   })

   it('Visits the site for the first time', () => {
      cy.get(SELECTORS.cookieNotificationWrapper)
         .should('be.visible')
         .should('have.css', 'top', '0px')

      cy.get(SELECTORS.cookieNotificationCtaLink)
         .should('be.visible')
         .contains('Manage cookie preferences')

      cy.get(SELECTORS.cookieNotificationCtaBtn)
         .should('be.visible')
         .contains('Agree')

      cy.get(SELECTORS.cookieNotificationCtaWall).should('have.length', 1)
      cy.percySnapshot('Page is Disabled and cookie wall appears');
   })

   it('Scrolls the page & verifies logo', () => {
      cy.scrollTo('bottom', { duration: 100 })
      cy.get(SELECTORS.cookieNotificationWrapper).should('have.css', 'top', '0px')
      cy.get(SELECTORS.navigation).should('have.css', 'top', '0px')
      cy.scrollTo('top', { duration: 100 })
      cy.percySnapshot('Scroll the page and verify logo')
   })

   it('Interacts with cookie banner opened', () => {
      cy.get(SELECTORS.cookieNotificationCtaWall).should('have.length', 1)
   })

   it('Clicks "Manage Cookie Preferences" & verifies overlay', () => {
      cy.get(SELECTORS.cookieNotificationCtaLink).click()
        .get('@overlay').then(response => {
         if (response.status === 200) {
            cy.get(SELECTORS.overlay).should('be.visible')
            .get(SELECTORS.overlayClose).click()
            .get(SELECTORS.cookieNotificationCtaWall)
            .should('have.length', 1)
            .should('have.css', 'transition', 'all 0.5s ease-in-out 0s')
         }
      })
   })

   it('Revisits the site', () => {
      cy.get('@cNSpec')
        .then(cNSpec => { 
         cy.setCookie(cNSpec.r_func, 'true')
           .setCookie(cNSpec.r_perf, 'true')
           .setCookie(cNSpec.r_adv, 'true')
         cy.reload()
         cy.get(SELECTORS.cookieNotificationCtaWall).should('have.length', 0)
      })
   })

   it('Clears Cookies & Reloads the page', () => {
      cy.clearCookies()
      cy.reload()
      cy.get(SELECTORS.cookieNotificationCtaWall).should('have.length', 1)
   })

   it('Navigates from one country site to the other', () => {
      cy.get(SELECTORS.cookieNotificationCtaBtn).click()
      cy.visit(
         'https://bp-com-test1.navitas.bpglobal.com/en_gb/united-kingdom/home.html'
      )
      cy.get(SELECTORS.cookieNotificationCtaWall).should('have.length', 0)
      cy.percySnapshot('Visit from one country site to the other')
   })
})
