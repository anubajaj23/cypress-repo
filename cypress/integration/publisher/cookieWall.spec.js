/// <reference types="Cypress" />

context('CookieWall', () => {
	beforeEach(() => {
		cy.eyesOpen({
			appName: 'BP Cypress with is Applitools!',
			testName: 'BP Cypress POC',
			browser: { width: 1024, height: 768 },
		})
		cy.visit('https://bp-com-test1.navitas.bpglobal.com')
	})

	it('Visits the site for the first time', () => {
		cy.get('.nr-cookie-notification-component')
			.should('be.visible')
			.should('have.css', 'top', '0px')

		cy.get('.nr-cookie-notification__cta-link')
			.should('be.visible')
			.contains('Manage cookie preferences')

		cy.get('.nr-cookie-notification__cta-button')
			.should('be.visible')
			.contains('Allow all')

		cy.get('.nr-cookie-notification__wall').should('have.length', 1)
	})

	it('Scrolls the page', () => {
		cy.scrollTo('bottom', { duration: 2000 })

		cy.get('.nr-cookie-notification-component').should('have.css', 'top', '0px')

		cy.scrollTo('top', { duration: 2000 })
	})

	it('Interacts with cookie banner opened', () => {
		cy.get('.nr-cookie-notification__wall').should('have.length', 1)
	})

	it('Scrolls the page & verifies logo', () => {
		cy.scrollTo('bottom', { duration: 2000 })

		cy.get('.nr-navigation').should('have.css', 'top', '0px')
	})

	it('Accepts the cookies & verifies cookie wall', () => {
		cy.get('.nr-cookie-notification__cta-button').click()
		cy.get('.nr-cookie-notification__wall').should('have.length', 0)
		cy.get('.nr-navigation__link:first').should('be.visible')
	})

	it('Accepts cookies and verifies on "Cookie Preferences" page', () => {
		cy.get('.nr-cookie-notification__cta-button').click()
		cy.visit(
			'https://bp-com-test1.navitas.bpglobal.com/en/global/corporate/cookie-preferences.html'
		)
		cy.get('.nr-cookie-preferences__input').should('be.checked')
	})

	it('Clicks "Manage Cookie Preferences" & verifies overlay', () => {
		cy.get('.nr-cookie-notification__cta-link').click()
		cy.request(
			'https://bp-com-test1.navitas.bpglobal.com/en/global/corporate/cookie-preferences.content.html?wcmmode=disabled'
		).then(() => {
			cy.get('.nr-overlay').should('be.visible')
			cy.get('.nr-overlay .nr-overlay__close').click()
			cy.get('.nr-cookie-notification__wall')
				.should('have.length', 1)
				.should('have.css', 'transition', 'all 0.5s ease-in-out 0s')
		})
	})

	it('Verifies elements on cookie modal', () => {
		cy.get('.nr-cookie-notification__cta-link').click()
		cy.request(
			'https://bp-com-test1.navitas.bpglobal.com/en/global/corporate/cookie-preferences.content.html?wcmmode=disabled'
		).then(() => {
			cy.get('.nr-overlay .nr-cookie-preferences__input').should(
				'have.length',
				2
			)
			cy.get('.nr-overlay .nr-overlay__close').should('have.length', 1)
			cy.get('.nr-overlay .nr-cookie-preferences__cta-button').should(
				'have.length',
				1
			)
			cy.get('.nr-overlay .nr-cookie-preferences__cta-button').trigger(
				'mouseover'
			)
		})
	})

	it('Toggles cookie sliders', () => {
		cy.get('.nr-cookie-notification__cta-link').click()
		cy.request(
			'https://bp-com-test1.navitas.bpglobal.com/en/global/corporate/cookie-preferences.content.html?wcmmode=disabled'
		).then(() => {
			cy.get('.nr-overlay').should('be.visible')

			cy.get('.nr-overlay .nr-cookie-preferences__input:first')
				.scrollIntoView({ easing: 'linear', duration: 1000 })
				.click({ force: true })

			cy.get('.nr-overlay .nr-cookie-preferences__switch:first').should(
				'be.visible'
			)

			cy.get('.nr-overlay .nr-cookie-preferences__input:eq(1)')
				.scrollIntoView({ easing: 'linear', duration: 1000 })
				.click({ force: true })

			cy.get('.nr-overlay .nr-cookie-preferences__switch:eq(1)').should(
				'be.visible'
			)
		})
	})

	it('Changes performance cookie', () => {
		cy.get('.nr-cookie-notification__cta-link').click()
		cy.request(
			'https://bp-com-test1.navitas.bpglobal.com/en/global/corporate/cookie-preferences.content.html?wcmmode=disabled'
		).then(() => {
			cy.get('.nr-overlay .nr-cookie-preferences__input:first')
				.scrollIntoView({ easing: 'linear', duration: 1000 })
				.click({ force: true })

			cy.get('.nr-overlay .nr-cookie-preferences__switch:first').should(
				'be.visible'
			)

			cy.get('.nr-overlay .nr-cookie-preferences__cta-button').click()

			cy.get('.nr-cookie-notification__wall').should('have.length', 0)
		})
	})

	it('Changes advertisement cookie', () => {
		cy.get('.nr-cookie-notification__cta-link').click()
		cy.request(
			'https://bp-com-test1.navitas.bpglobal.com/en/global/corporate/cookie-preferences.content.html?wcmmode=disabled'
		).then(() => {
			cy.get('.nr-overlay .nr-cookie-preferences__input:eq(1)')
				.scrollIntoView({ easing: 'linear', duration: 1000 })
				.click({ force: true })

			cy.get('.nr-overlay .nr-cookie-preferences__switch:eq(1)').should(
				'be.visible'
			)

			cy.get('.nr-overlay .nr-cookie-preferences__cta-button').click()

			cy.get('.nr-cookie-notification__wall').should('have.length', 0)
		})
	})

	it('Verifies changes on Cookie Preferences page', () => {
		cy.get('.nr-cookie-notification__cta-button').click()
		cy.visit(
			'https://bp-com-test1.navitas.bpglobal.com/en/global/corporate/cookie-preferences.html'
		)
		cy.get('.nr-navigation__link:first').should('be.visible')
		cy.get('.nr-cookie-notification__wall').should('have.length', 0)
		cy.get('.nr-cookie-preferences__input:eq(0)').scrollIntoView({
			easing: 'linear',
			duration: 1000,
		})
		cy.get('.nr-cookie-preferences__input:eq(1)').scrollIntoView({
			easing: 'linear',
			duration: 1000,
		})
	})

	it('Switches off all cookies and verifies component', () => {
		cy.setCookie('r_func', 'true')
		cy.setCookie('r_perf', '')
		cy.setCookie('r_adv', '')
		cy.visit(
			'https://bp-com-test1.navitas.bpglobal.com/en/global/corporate/cookie-preferences.html'
		)
		cy.get('.nr-cookie-notification__wall').should('have.length', 0)
	})

	it('Revisits the site', () => {
		cy.setCookie('r_func', 'true')
		cy.setCookie('r_perf', 'true')
		cy.setCookie('r_adv', 'true')
		cy.reload()
		cy.get('.nr-cookie-notification__wall').should('have.length', 0)
	})

	it('Clears Cookies & Reloads the page', () => {
		cy.clearCookies()
		cy.reload()
		cy.get('.nr-cookie-notification__wall').should('have.length', 1)
	})

	it('Navigates from one country site to the other', () => {
		cy.get('.nr-cookie-notification__cta-button').click()
		cy.visit(
			'https://bp-com-test1.navitas.bpglobal.com/en_gb/united-kingdom/home.html'
		)
		cy.get('.nr-cookie-notification__wall').should('have.length', 0)
	})

	afterEach(() => {
		cy.eyesClose()
	})
})
