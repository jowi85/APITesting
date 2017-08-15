var request = require('request');
var should = require('chai').should();

//Basic API Endpoint call and HTTP status code validation
describe('Sample tests to Blizzard Entertainment\'s public API', function() {
    it('TC1: Happy path - status code 200', function (done) {
        request.get({url: 'https://us.api.battle.net/wow/character/dalaran/eeyr?fields=stats&locale=en_US&apikey=' + process.env.APIKEY},
            function optionalCallback(err, httpResponse) {
                httpResponse.statusCode.should.equal(200);
                done();
            });
    });
    it('TC2: Invalid API account - status code 403', function (done) {
        request.get({url: 'https://us.api.battle.net/wow/character/dalaran/eeyr?fields=stats&locale=en_US&apikey='},
            function optionalCallback(err, httpResponse) {
                httpResponse.statusCode.should.equal(403);
                JSON.parse(httpResponse.body).detail.should.equal("Account Inactive");
                done();
            });
    });
    it('TC3: Invalid character name - status code 404', function (done) {
        request.get({url: 'https://us.api.battle.net/wow/character/dalaran/notAValidName?fields=stats&locale=en_US&apikey=' + process.env.APIKEY},
            function optionalCallback(err, httpResponse) {
                httpResponse.statusCode.should.equal(404);
                JSON.parse(httpResponse.body).status.should.equal("nok");
                JSON.parse(httpResponse.body).reason.should.equal("Character not found.");
                done();
            });
    });
    it('TC4: Invalid realm name - status code 404', function (done) {
        request.get({url: 'https://us.api.battle.net/wow/character/notAValidName/eeyr?fields=stats&locale=en_US&apikey=' + process.env.APIKEY},
            function optionalCallback(err, httpResponse) {
                httpResponse.statusCode.should.equal(404);
                JSON.parse(httpResponse.body).status.should.equal("nok");
                JSON.parse(httpResponse.body).reason.should.equal("Realm not found.");
                done();
            });
    });
    it('TC5: Invalid endpoint - status code 596', function (done) {
        request.get({url: 'https://us.api.battle.net/thisIsNotAValidEndpoint/wow/character/dalaran/eeyr?fields=stats&locale=en_US&apikey=' + process.env.APIKEY},
            function optionalCallback(err, httpResponse) {
                httpResponse.statusCode.should.equal(596);
                httpResponse.body.should.include("Service Not Found");
                done();
            });
    });
});
