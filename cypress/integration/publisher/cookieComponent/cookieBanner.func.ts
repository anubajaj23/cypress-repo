import { cookieBannerPageUrl } from '../../../utils/publisher/func.pageurl.util'

const SELECTORS  = {
   cookieNotificationWrapper: '.nr-cookie-notification-component',
   cookieNotificationCtaLink: '.nr-cookie-notification__cta-link',
   cookieNotificationCtaBtn: '.nr-cookie-notification__cta-button',
   cookieNotificationCtaWall: '.nr-cookie-notification__wall',
   navigationLinkFirst: '.nr-navigation__link:first'
} as const

context('CookieWall', () => {
   beforeEach(() => {
      cy.visit(cookieBannerPageUrl)
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


   it('Verify hover state of "View Cookie Preferences Link" & Agree button', () => {
      cy.get(SELECTORS.cookieNotificationCtaLink).invoke('attr', 'style', 'color:#007f00')
      cy.get(SELECTORS.cookieNotificationCtaBtn).invoke('attr', 'style', 'background-color:rgba(0,127,0,.8)')
      cy.percySnapshot('Hover state is visible');
   })

   it('Accepts the cookies & verifies cookie wall', () => {
      cy.get(SELECTORS.cookieNotificationCtaBtn).click()
      cy.get(SELECTORS.cookieNotificationCtaWall).should('have.length', 0)
      cy.get(SELECTORS.navigationLinkFirst).should('be.visible')
      cy.percySnapshot('Accept the cookies and cookie wall is closed');
   })
})
