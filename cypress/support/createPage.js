Cypress.Commands.add('createpage', (url, pageName) => {
	cy.visit(url)
	cy.login()
	cy.title().should('eq', 'AEM Sites')
	cy.get(
		'.granite-collection-create.foundation-toggleable-control.coral3-Button.coral3-Button--primary'
	).click()
	cy.contains('Page').click()
	cy.wait(2000)
	cy.contains('Navitas').click()
	cy.get(
		'.is-selected > coral-panel-content > .foundation-layout-inline2 > .coral3-Button--primary > coral-button-label'
	).click()
	cy.get('input[name*="jcr:title"]').click().type('Cypress Homepage')
	cy.get('input[name*="pageName"]').click().type(pageName)
	cy.get('button[type="submit"]').click()
	cy.wait(1000)
	cy.contains('Done').click({ force: true })
})

Cypress.Commands.add('deletePage', (url, createPagePath) => {
	cy.visit(url)
	cy.login()
	cy.get(
		`[data-foundation-collection-item-id="${createPagePath}"] > coral-columnview-item-thumbnail > .foundation-collection-item-thumbnail`
	).click({ force: true })
	cy.get(
		'.coral3-ActionBar-primary > :nth-child(13) > .betty-ActionBar-item'
	).click({ force: true })
	cy.wait(1000)
	cy.get('coral-dialog.is-open .coral3-Button--warning:first').click({
		force: true,
	})
})
