import * as selectors from '../../../utils/author/auth.selectors'
import ComponentList from '../../../utils/author/auth.wait.component.util'
const cookieNotificationDataPath = `[data-type="Editable"][data-path="${selectors.createdPagePath}/jcr:content/root/cookieNotification"]`

context('Cookie Component Author Dialog', () => {

  beforeEach(() => {
    const pageSelector = new ComponentList()
    pageSelector.isComponentLoaded()
    cy.fixture('cookieAuth').as('cNData')
  })  
  
  it('Open Cookie dialog and verify elements with prefilled values', () => {
    cy.wait('@components').then(() => {
      cy.get(`div${cookieNotificationDataPath}`).click({ force: true })
        .get(selectors.TOOLBAR.configureButton).click()

      cy.get('@cNData')
        .then(cNData => { 
          cy.get('[name="./cookieNotificationTitle"]')
            .should('be.visible')
            .should('have.value', cNData.cookieNotificationTitle)

            .get('[name="./cookieNotificationDescription"]')
            .should('be.visible')
            .should('have.value', cNData.cookieNotificationDescription)

            .get('[name="./cookieNotificationPrimaryTitle"]')
            .should('be.visible')
            .should('have.value', cNData.cookieNotificationPrimaryTitle)

            .get('foundation-autocomplete[name="./cookieNotificationPrimaryPath"]')
            .find('input[is="coral-textfield"]')
            .invoke('attr', 'value', cNData.cookieNotificationPrimaryPath)
            .should('have.attr', 'value', cNData.cookieNotificationPrimaryPath)

            .get('[name="./cookieNotificationSecondaryTitle"]')
            .should('have.value', cNData.cookieNotificationSecondaryTitle)
            .then(() => {
              cy.percySnapshot('Open Cookie dialog and verify elements with prefilled values')
                .get(selectors.MODAL.cancelDialog).click({ force: true })
            })
        })
    })
  })

  it('Check empty filled values', () => {
    cy.wait('@components').then(() => {
      cy.get(`div${cookieNotificationDataPath}`).click({ force: true })
        .get(selectors.TOOLBAR.configureButton).click()

        .get('[name="./cookieNotificationTitle"]')
        .invoke('attr', 'value', '')
        .should('have.attr', 'value', '')

        .get('[name="./cookieNotificationDescription"]')
        .invoke('attr', 'value', '')
        .should('have.attr', 'value', '')

        .get('[name="./cookieNotificationPrimaryTitle"]')
        .invoke('attr', 'value', '')
        .should('have.attr', 'value', '') 

        .get('foundation-autocomplete[name="./cookieNotificationPrimaryPath"]')
        .find('input[is="coral-textfield"]')
        .invoke('attr', 'value', '')
        .should('have.attr', 'value', '') 

        .get('[name="./cookieNotificationSecondaryTitle"]')
        .invoke('attr', 'value', '')
        .should('have.attr', 'value', '') 
        .get(selectors.MODAL.submitDialog).click({ force: true })
        .then(() => {
          cy.percySnapshot('Check empty values')
        })
    })
  })

  it('Check Special symbols characters', () => {
    cy.wait('@components').then(() => {
      cy.get(`div${cookieNotificationDataPath}`).click({ force: true })
        .get(selectors.TOOLBAR.configureButton).click()

      cy.get('[name="./cookieNotificationTitle"]')
        .invoke('attr', 'value', selectors.specialSymbols)

        .get('foundation-autocomplete[name="./cookieNotificationPrimaryPath"]')
        .find('input[is="coral-textfield"]')
        .invoke('attr', 'value', selectors.testURLForPathBrowser)
        .should('have.attr', 'value', selectors.testURLForPathBrowser) 

        .get(selectors.MODAL.submitDialog).click({ force: true })
        .then(() => {
          cy.percySnapshot('Check Special symbols characters')
        })
    })
  })
})
