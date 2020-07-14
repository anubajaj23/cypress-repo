// TODO : Need to code performace report
// The idea is to generate lighthouse report for all components under one path, 

import 'cypress-lighthouse';

describe('Performance Metrics for Author Hobbes Test', () => {
  before(function () {
    cy.lighthouse('https://bp-com-test1.navitas.bpglobal.com/countries/en/global/home/contact-us.html').as('results')
  });
  it('Meets performance benchmarks', function () {
    // Assert that the performance metric is greater than .85
    cy.wrap(this.results.performance).should('be.gt', .85);
  })
});