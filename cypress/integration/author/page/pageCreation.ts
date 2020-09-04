context('Create a page named as "cypress-homepage" ', () => {
   it('Create a page', () => { 
      cy.beforeHook() 
      cy.screenshot(':Page has been created')  
   })
})
