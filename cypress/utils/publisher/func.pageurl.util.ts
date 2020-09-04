import Env from '../../../cypress/config/env.json'
const envValues = Env[Cypress.env().configFile]
const bpHomePageUrl = envValues.env.baseUrl
const aralHomePageUrl = envValues.env.aralHomePageUrl
const castrolHomePageUrl = envValues.env.castrolHomePageUrl
const brandName = Cypress.env('brand')

let 
   cypressPageUrl: string = '/cypress/en/global/cypress-homepage',
   adaptivePageUrl: string,
   homePageUrl: string,
   cookiePreferencesPageUrl: string,
   cookieOverlay: string

if(brandName === 'bp') {
   homePageUrl = bpHomePageUrl
   adaptivePageUrl = `${homePageUrl}${cypressPageUrl}/adaptive-image.html`
   cookiePreferencesPageUrl = `${homePageUrl}${cypressPageUrl}/cookie-preferences.html`
   cookieOverlay = `${homePageUrl}${cypressPageUrl}/cookie-preferences.content.html?wcmmode=disabled`
} else if(brandName === 'aral') {
   homePageUrl = aralHomePageUrl
   adaptivePageUrl = `${homePageUrl}${cypressPageUrl}/adaptive-image.html`
   cookiePreferencesPageUrl = `${homePageUrl}${cypressPageUrl}/cookie-preferences.html`
   cookieOverlay = `${homePageUrl}${cypressPageUrl}/cookie-preferences.content.html?wcmmode=disabled`
} else {
   homePageUrl = castrolHomePageUrl
   adaptivePageUrl = `${homePageUrl}${cypressPageUrl}/adaptive-image.html`
   cookiePreferencesPageUrl = `${homePageUrl}${cypressPageUrl}/cookie-preferences.html`
   cookieOverlay = `${homePageUrl}${cypressPageUrl}/cookie-preferences.content.html?wcmmode=disabled`
}

export {
   homePageUrl,
   cookiePreferencesPageUrl,
   adaptivePageUrl,
   cookieOverlay
}
