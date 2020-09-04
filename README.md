# cypress-scaffold
This repo serves at very basic level of cypress test framework. You can change/modify/add/delete files according to your need
#####################################################
##           Configuration and execution           ##
#####################################################
   1. run npm install
   2. run npm install cypress
   3. In package.json file, pass username and password for local and dev1 environment in script block
   4. to execute script
      a) Test authoring in local, use this command: npm run local
      b) Headless test authoring in local, use this command: npm run local-headless
      c) Test authoring in dev1, use this command: npm run devAuth
      d) Headless test authoring in dev1, use this command: npm run devAuth-headless

#####################################################
#####################################################
   NOTE:
   1) -s in command line hides username and password in terminal
   2) cypress.env.json is not used, as multiple config files are used for multiple environment.
#####################################################
#####################################################

#####################################################
##                   Node versions                 ##
#####################################################
   node version used : v8.2.1
   npm version used : 5.10.0

IMPORTANT:
   FOR MOCHA REPORTS, NODE VERSION UPDATE IS ESSENTIAL
      node version used : v10.22.0
      npm version used : 6.14.6
      for local machine use nvm
      reference : https://www.sitepoint.com/quick-tip-multiple-versions-node-nvm/

#####################################################
##        HOW TO RUN SCRIPTS AND COMMANDS          ##
#####################################################
Conventions Used for runnning scripts:
   1) For Local env: local
   2) For Dev1 Author: devAuth
   3) For Dev1 Publisher: debPub
   4) For Test1 Author: testAuth
   5) For Test1 Publisher: testPub

   To run test suite, use following format and pass parameters accordingly
      For example 
         - Environment Specification: --server=devAuth/devPub
         - Brand Specification : --brand=aral/castrol/bp
         - Username: --username=username
         - Password: --password=password
         - Specific test case: -- --spec "specname.ts"
         - Browser change: -- --browser firefox

      To run all test cases for specific brand in browser example
         1) npm run start --server=local --brand=aral --username=admin --password=admin
         2) npm run start --server=devAuth --brand=castrol --username=admin --password=admin
         3) npm run start --server=testPub --brand=bp --username=admin --password=admin
   
      To run all test cases headless for specific brand example
         1) npm run start-headless --server=local --brand=aral --username=admin --password=admin
         2) npm run start-headless --server=devAuth --brand=castrol --username=admin --password=admin
   
      To run complete author test suite for specific brand example
         1) npm run author --server=local --brand=aral --username=admin --password=admin

      To run complete functional test suite for specific brand example
         1) npm run functional --server=local --brand=aral --username=admin --password=admin

   To run SINGLE test case in specific brand
      npm run start-headless --server=local --brand=aral --username=admin --password=admin -- --spec "cypress/integration/author/component/cookieNotification.auth.ts"
      for multiple files, use comma separated file names
   
   To run SINGLE test case in multi brands
      npm run start-headless --server=local --brand=aral --username=admin --password=admin -- --spec "cypress/integration/author/component/cookieNotification.auth.ts" & npm run start-headless --server=local --brand=bp --username=admin --password=admin -- --spec "cypress/integration/author/component/cookieNotification.auth.ts" & npm run start-headless --server=local --brand=castrol --username=admin --password=admin -- --spec "cypress/integration/author/component/cookieNotification.auth.ts"

      for multiple files, use comma separated file names

   To CHANGE BROWSER in headless mode example
      npm run start-headless --server=local --brand=aral --username=admin --password=admin -- --browser chrome

   TO RUN TEST SUITE WITH REPORT USE COMMAND
      npm run test --server=local --brand=aral --username=admin --password=admin
   
#################################################################################
################             PARALLEL TASK EXECUTION             ################
#################################################################################
   1) To run task in parallel, CI-CD integration is must and that CI-CD environment must support the parralel task execution
   2) Before parralel execution, recording must be enabled.

   TO RUN TEST SUITE PARALLEL
      npm run test-parallel --server=local --brand=aral --username=admin --password=admin

***********************************************************************************************************
***********************************************************************************************************
These are the basic commands which is used for reporting.
Reference : https://www.youtube.com/watch?v=ftie-ASpbzY&list=PLzDWIPKHyNmK9NX9_ng2IdrkEr8L4WwB0&index=12

   "clean:reports": "rm -R -f cypress/reports && mkdir cypress/reports && mkdir cypress/reports/mochareports",
    "pretest": "npm run clean:reports",
    "scripts": "cypress run -e configFile=local,username=admin,password=admin",
    "combine-reports": "mochawesome-merge cypress/reports/mocha/*.json > cypress/reports/mochareports/report.json",
    "generate-report": "marge cypress/reports/mochareports/report.json -f report -o cypress/reports/mochareports",
    "posttest": "npm run combine-reports && npm run generate-report",
    "test": "npm run -s scripts || npm run posttest"
***********************************************************************************************************
***********************************************************************************************************

#####################################################
##        ONLY and SKIP test cases          ##
#####################################################
   to run only a single use case, we need to add "only" command in the js file
      e.g in cypress/integration/author/cookieComponent/cookieNotification/cookieNotification.dialog.js file, 
      if there are many it statements, and we want to execute only a single it statement rather than all, we use 
      "it.only('your code here')" with in the block 
      Same goes for skip
      "it.skip('your code')"

   the "only" attribute will execute that single it statement in js file and "skip" will skip only that case and execute rest "it" statements


#################################################################################
################                Folder requirements              ################
#################################################################################
   FOR VIDEO, cypress creates a video folder by its own
   FOR SCREENSHOT, cypress creates a video folder by its own
   FOR MOCHA REPORTING:
      create a folder structure: reports/mochareports inside cypress folder


#################################################################################
################                LightHouse              ################
#################################################################################
   Reference Link: https://www.npmjs.com/package/cypress-lighthouse
   To use cypress-lighthouse:
   1) import 'cypress-lighthouse' at the top of your test file.
   2) Call cy.lighthouse(url) wherever required.



#################################################################################
################                AXE              ################
#################################################################################
   Reference Link: https://github.com/avanslaars/cypress-axe
   To use cypress-axe
   1) Call cy.injectAxe() after cy.visit()
   2) Call cy.checkA11y() in any it block
   


#################################################################################
################                ESLINT              ################
#################################################################################
   To run eslint
   1) Run: npm run lint


#################################################################################
################                Prettier              ################
#################################################################################
   To run prettier according to the set of rules
   1) Run: npm run format

#################################################################################
################   Intergrate test report to cypress dashboard   ################
#################################################################################
When user run tests on any environment, the report and screenshots are saved and served locally
on the environment.
This data can be uploaded on cypress dashboard so that anybody can see the report online.
To achieve this, following changes are required
   1) in cypress.json, add the  "projectId": "your project id" entry
   2) in package.json, add --record --key <key obtained from cypress dashboard> argument in cypress command. 
   
   e.g. "cypress run --record --key 724e0985-b9a3-4829-ad0e-2c1d500c10ed -e configFile=local,username=admin,password=admin"

   IMPORTANT NOTE: CONTEXT WILL BE USED AS GROUP NAME IN REPORTS. SO, USE THE MEANINGFUL CONTEXT 

#################################################################################
################   Manual Task for Author ################
#################################################################################
1) Author must create a page 'cypress-homepage' under the given path: 'hostName/content/bp-test/cypress/en/global'
For example after creating the page, url will be like this:
https://author-cq-dev1.navitas.bpglobal.com/editor.html/content/bp-test/cypress/en/global/cypress-homepage.html


#################################################################################
################   Manual Task for Publisher ################
#################################################################################
1) Assuming that page has been created in author and activated 
2) Testing Component should be there in the page. 
   1) For eg If 'Gallery' components needs to be tested then Gallery should bee placed in the page already
3) After activating the page, url will be like this:
https://bp-com-dev1.navitas.bpglobal.com/cypress/en/global/cypress-homepage.html