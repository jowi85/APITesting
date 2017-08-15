# API Testing
Basic API endpoint testing using nodeJS.  Request makes http calls, mocha is the test framework, chai is the assertion library.  To run these you must pass your own APIKEY as an environment variable.

### To run tests:
1) Install NodeJS/NPM on your machine (https://nodejs.org/en/).  
2) In ~/nodeJS-API-testing-sample directory, run `npm install`.
3) Test.js can either be run creating a mocha run configuration in your IDE (eclipse, intelliJ) or via command line with the syntax `APIKEY=yourApiKey ./node_modules/mocha/bin/mocha test.js -t 5000`.
