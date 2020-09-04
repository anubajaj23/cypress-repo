context('Delete a page named as "cypress-homepage" ', () => {
   it('Delete a page', () => { 
      cy.deleteHook()    
      cy.screenshot(':Page has been deleted')  
   })
})
