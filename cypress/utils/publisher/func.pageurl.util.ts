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
   cookieOverlay: string,
   cookieBannerPageUrl: string

if(brandName === 'bp') {
   homePageUrl = bpHomePageUrl
   adaptivePageUrl = `${homePageUrl}${cypressPageUrl}/adaptive-image.html`
   cookiePreferencesPageUrl = `${homePageUrl}${cypressPageUrl}/cookie-preferences.html`
   cookieOverlay = `${homePageUrl}${cypressPageUrl}/cookie-preferences.content.html?wcmmode=disabled`
   cookieBannerPageUrl = `${homePageUrl}/cypress/en/global/home-cw.html`
} else if(brandName === 'aral') {
   homePageUrl = aralHomePageUrl
   adaptivePageUrl = `${homePageUrl}/${cypressPageUrl}/adaptive-image.html`
   cookiePreferencesPageUrl = `${homePageUrl}${cypressPageUrl}/cookie-preferences.html`
   cookieOverlay = `${homePageUrl}${cypressPageUrl}/cookie-preferences.content.html?wcmmode=disabled`
   cookieBannerPageUrl = `${homePageUrl}/cypress/en/global/home-cw.html`
} else {
   homePageUrl = castrolHomePageUrl
   adaptivePageUrl = `${homePageUrl}/${cypressPageUrl}/adaptive-image.html`
   cookiePreferencesPageUrl = `${homePageUrl}${cypressPageUrl}/cookie-preferences.html`
   cookieOverlay = `${homePageUrl}${cypressPageUrl}/cookie-preferences.content.html?wcmmode=disabled`
   cookieBannerPageUrl = `${homePageUrl}/cypress/en/global/home-cw.html`
}

export {
   homePageUrl,
   cookiePreferencesPageUrl,
   adaptivePageUrl,
   cookieOverlay,
   cookieBannerPageUrl
}
