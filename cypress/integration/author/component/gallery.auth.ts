import * as selectors from '../../../utils/author/auth.selectors'
import ComponentList from '../../../utils/author/auth.wait.component.util'

const galleryDropZone = `[data-type="Editable"][data-path="${selectors.createdPagePath}/jcr:content/root/gallery"]`
const galleryInLayoutDropZone = `[data-type="Editable"][data-path="${selectors.createdPagePath}/jcr:content/root/layout/gallery"]`
const galleryDataPath = `[value="/apps/navitas/components/gallery"]`
const layoutDropZone = `[data-type="Editable"][data-path="${selectors.createdPagePath}/jcr:content/root/layout"]`
const layoutDataPath = `[value="/apps/navitas/components/layout"]`

context('Gallery Component Author Dialog', () => {
   beforeEach(() => {
      const pageSelector = new ComponentList()
      pageSelector.isComponentLoaded()
      cy.fixture('galleryAuth').as('galleryData');
   })  
   
   it('Open the Gallery dialog and verifies elements and values', () => {        
      cy.wait('@components').then(() => {
         cy.get(selectors.dropZone).click()
           .get(selectors.TOOLBAR.insertComponent).click()
           .get(`${selectors.componentListUrl}${galleryDataPath}`).click({force : true})
         cy.percySnapshot('Gallery component added')

         cy.get(`div${galleryDropZone}`).should('be.visible').click({ force: true })
           .get(selectors.TOOLBAR.configureButton).click()
            
         cy.get('@galleryData')
           .then(galleryData => { 
               cy.get('[name="./galleryTitle"]')
                  .should('be.visible')
                  .invoke('attr', 'value', galleryData.galleryTitle)
                  .should('have.attr', 'value', galleryData.galleryTitle)

                  .get('foundation-autocomplete[name="./folderPath"]')
                  .find('input[is="coral-textfield"]')
                  .invoke('attr', 'value', galleryData.folderPath)
                  .should('have.attr', 'value', galleryData.folderPath)
            
                  .get('[name="./sortingOrder"]')
                  .should('be.visible')
                  .should('value', galleryData.sortingOrderDam)
                  
                  .get('[name="./loadMore"]')
                  .should('be.visible')
                  .should('value', galleryData.loadMore)
                  .then(() => {
                     cy.percySnapshot('Gallery component with values')
                        .get(selectors.MODAL.cancelDialog).click({ force: true })
                  })              
                  cy.get(`div${galleryDropZone}`).should('be.visible').click({ force: true })
                    .get(selectors.TOOLBAR.removeComponent).click({force:true})
                    .get(selectors.MODAL.deleteComponentButton).click({force: true})
               })
      })
   })

   it('Create and Delete Gallery with Layout Container', () => {
      cy.wait('@components').then(() => {
         cy.get(selectors.dropZone).click()
           .get(selectors.TOOLBAR.insertComponent, { timeout: 100 }).click()
           .get(`${selectors.componentListUrl}${layoutDataPath}`).click({force : true})

         cy.get(`div${layoutDropZone}`).should('be.visible').click({ force: true })
            .get(selectors.dropZoneLayout).click({force:true})
            .get(selectors.TOOLBAR.insertComponent, { timeout: 100 }).click()
            .get(`${selectors.componentListUrl}${galleryDataPath}`).click({force : true})

      cy.percySnapshot('Gallery component added with Layout Container')

         cy.get(`div${galleryInLayoutDropZone}`).should('be.visible').click({ force: true })
            .get(selectors.TOOLBAR.removeComponent).click()
         cy.get(selectors.MODAL.deleteComponentButton).click({force: true})

         cy.get(`div${layoutDropZone}`).should('be.visible').click({force: true})
            .get(selectors.TOOLBAR.removeComponent).click()
            .get(selectors.MODAL.deleteComponentButton).click({force: true})
      })
   })
})
