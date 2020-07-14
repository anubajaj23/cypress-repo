/// <reference types="Cypress" />

const server = Cypress.env('server')
const createPageAt = Cypress.env('createPageAt')

const createdPageName = 'cypress-homepage'
const createdPagePath = `${createPageAt}/${createdPageName}`
const createPageUrl = `${server}/sites.html${createPageAt}`
const homePageUrl = `${server}/editor.html${createdPagePath}.html`
const dataPath = `[data-path="${createdPagePath}/jcr:content/root/cookieNotification"]`

// To be used later
var FORM =
	'[action="/content/bp/country-sites/en_gb/united-kingdom/cypress-homepage20/_jcr_content/root/cookieNotification"]'

context('Cookie Component Author Dialog', () => {
	before(() => {
		cy.eyesOpen({
			appName: 'Cookie Author Component',
			testName: 'Cookie Author Component',
			browser: { width: 1440, height: 900 },
		})
	})

	it('Creates the page', () => {
		cy.createpage(createPageUrl, createdPageName)
	})

	it('Open the Cookie dialog and verifies elements and values', () => {
		cy.visit(homePageUrl)
		cy.login()
		cy.wait(3000)

		cy.get(`div${dataPath}`).click({ force: true })

		cy.get(`button[title="Configure"]`).click()

		cy.get('[name="./cookieNotificationTitle"]')
			.should('be.visible')
			.should('have.value', 'Site Traffic Information and Cookies')

		cy.get('[name="./cookieNotificationDescription"]')
			.should('be.visible')
			.should(
				'have.value',
				"We use cookies to collect and analyse information on our site's performance and to enable the site to function. Cookies also allow us and our partners to show you relevant ads when you visit our site and other 3rd party websites, including social networks. You can choose to allow all cookies by clicking 'Allow all', or manage them individually by clicking 'Manage cookie preferences', where you will also find more information."
			)

		cy.get('[name="./cookieNotificationPrimaryTitle"]')
			.should('be.visible')
			.should('have.value', 'Manage cookie preferences')

		cy.get('foundation-autocomplete[name="./cookieNotificationPrimaryPath"]')
			.find('input[is="coral-textfield"]')
			.invoke('attr', 'value', '/content/bp')
			.should('have.attr', 'value', '/content/bp')

		cy.get('foundation-autocomplete[name="./cookieNotificationPrimaryPath"]')
			.find('input[name="./cookieNotificationPrimaryPath"]')
			.invoke('show')
			.invoke('attr', 'val', '/content/bp')

		cy.get('[name="./cookieNotificationSecondaryTitle"]').should(
			'have.value',
			'Allow all'
		)

		// TODO
		//cy.get(FORM).submit();
	})

	it('Deletes the page', () => {
		cy.deletePage(createPageUrl, createdPagePath)
		cy.reload()
	})

	after(() => {
		cy.eyesClose()
	})
})
