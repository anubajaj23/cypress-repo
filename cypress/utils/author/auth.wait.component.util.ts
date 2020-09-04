import { baseUrl } from './auth.selectors'

class ComponentList {

   /** 
    * @classMethod isComponentLoads
    * make an alias for components after rounting the component xhr
    */
   isComponentLoaded() {
      return cy.visit(baseUrl).login().server().route('/libs/wcm/core/content/components*').as('components')
   }
}

export default ComponentList