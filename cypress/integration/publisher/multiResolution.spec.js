/// <reference types="Cypress" />

const resolutions = [
	{ w: 3840, h: 2160 },
	{ w: 2736, h: 1824 },
	{ w: 1920, h: 1080 },
	{ w: 1440, h: 900 },
	{ w: 1366, h: 768 },
	{ w: 1024, h: 768 },
]

resolutions.forEach(resolution => {
	const { w, h } = resolution
	describe(`Runs the test in "${w} x ${h}" resolution`, () => {
		beforeEach(() => {
			cy.eyesOpen({
				appName: 'Hello World!',
				testName: 'My first JavaScript test!',
				browser: { width: w, height: h },
			})
		})

		it(`Visits site for resolution "${w} x ${h}"`, () => {
			cy.visit('https://google.com')
		})

		afterEach(() => {
			cy.eyesClose()
		})
	})
})
