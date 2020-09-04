import Env from '../../../cypress/config/env.json'
import {bpTestPage, aralTestPage, castrolTestPage } from '../../utils/author/auth.pageurl.util'
let createPageAt

const envValues = Env[Cypress.env().configFile]
const username = Cypress.env('username')
const password = Cypress.env('password')
const server = envValues.env.baseUrl
const brandName = Cypress.env('brand')

if(brandName === 'bp') {
  createPageAt = bpTestPage
}
else if(brandName === 'aral') {
  createPageAt = aralTestPage
}
else {
  createPageAt = castrolTestPage
}

const createdPageName = 'cypress-homepage'
const createdPagePath = `${createPageAt}/${createdPageName}`
const createPageUrl = `${server}/sites.html${createPageAt}`
const homePageUrl = `${server}/editor.html${createdPagePath}.html`
const componentListUrl = '.coral3-SelectList-item'
const dropZone = 'div[data-type="Editable"][data-text="Drag components here"]'
const dropZoneLayout = `[data-path="${createdPagePath}/jcr:content/root/layout/*"][data-text="Drag components here"]`
const specialSymbols = '~!@#$%^&*()'
const testURLForPathBrowser = 'https://www.google.com/'

// Added baseUrl if there is no need of creation and deletion the page just like hobbes, Assuming that cypress-homepage page is always there 
const baseUrl = `${server}/editor.html${createdPagePath}.html`

const TOOLBAR = {
  insertComponent: 'button[data-action="INSERT"][title="Insert component"]',
  configureButton: 'button[title="Configure"]',
  removeComponent: 'button[data-action="DELETE"]',
}

const MODAL = {
  deleteComponentButton: 'button[is="coral-button"][variant="warning"]',
  submitDialog: '.cq-dialog-actions .cq-dialog-submit',
  cancelDialog: 'button[is="coral-button"][title="Cancel"]',
}

export {
  username,
  password,
  server,
  createPageAt,
  createdPageName,
  createdPagePath,
  createPageUrl,
  homePageUrl,
  baseUrl,
  componentListUrl,
  dropZone,
  dropZoneLayout,
  specialSymbols,
  testURLForPathBrowser,
  MODAL,
  TOOLBAR
}
