import * as selectors from './auth.selectors'

/**
 * @customCommand beforeHook
 * Call this hook before every test case execution
 * It creates the page according to given condition
 */
Cypress.Commands.add('beforeHook', () => {
   cy.visit(selectors.server)
   .then(() => {
      cy.login()
         .visit(selectors.createPageUrl)
            .then(() => {
               cy.get('body').then($body => {
                  if ($body.find(`[data-foundation-collection-item-id="${selectors.createdPagePath}"]`).length) {
                     cy.deletePage(selectors.createPageUrl, selectors.createdPagePath)
                        .createPage(selectors.createPageUrl, selectors.createdPageName)
                  } else {
                     cy.createPage(selectors.createPageUrl, selectors.createdPageName)
                  }
               })
            })
   })
})

/**
 * @customCommand deleteHook
 * Call this hook after every test case execution
 * It deletes the page
 */
Cypress.Commands.add('deleteHook', () => {
   cy.deletePage(selectors.createPageUrl, selectors.createdPagePath)
         .then(() => {
            cy.visit(selectors.createPageUrl)
         })
})

/**
 * @customCommand createPage
 * To create a new page
 */
Cypress.Commands.add('createPage', (url, pageName) => {
   cy.visit(url)
      .title().should('eq', 'AEM Sites')
      .get(
         '.granite-collection-create.foundation-toggleable-control.coral3-Button.coral3-Button--primary').click()
   cy.contains('Page').click()
   cy.contains('Navitas').click()
      .get(
         '.is-selected > coral-panel-content > .foundation-layout-inline2 > .coral3-Button--primary > coral-button-label').click()
      .get('input[name*="jcr:title"]').click().type('Cypress Homepage')
      .get('input[name*="pageName"]').click().type(pageName)
      .get('button[type="submit"]').click()
   cy.contains('Done').click({ force: true })
})

/**
 * @customCommand deletePage
 * To delete a existing page
 */
Cypress.Commands.add('deletePage', (url, createPagePath) => {
   cy.visit(selectors.server)
   .then(() => {
      cy.login()
         .visit(selectors.createPageUrl)
            .then(() => {
         cy.get(
            `[data-foundation-collection-item-id="${createPagePath}"] > coral-columnview-item-thumbnail > .foundation-collection-item-thumbnail`).click()
         cy.get(
            '.coral3-ActionBar-primary > :nth-child(13) > .betty-ActionBar-item').click({ force: true })
         cy.get('coral-dialog.is-open .coral3-Button--warning:first').click({
            force: true,
         })
      })
})
