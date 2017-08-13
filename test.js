var request = require('request');
var should = require('chai').should();

//Basic API Endpoint call and HTTP status code validation
describe('Sample tests to Blizzard Entertainment\'s public API', function() {
    it('GET request to endpoint, check HTTP status code is 200', function (done) {
        request.get({url: 'https://us.api.battle.net/wow/character/dalaran/eeyr?fields=stats&locale=en_US&apikey=' + process.env.APIKEY},
            function optionalCallback(err, httpResponse) {
                httpResponse.statusCode.should.equal(200);
                done();
            });
    });
    it('GET request to first endpoint, store value from response, pass value to second endpoint', function (done) {
        request.get({url: 'https://us.api.battle.net/wow/character/dalaran/eeyr?fields=items&locale=en_US&apikey=' + process.env.APIKEY},
        function optionalCallback(err, httpResponse) {
            var itemID = JSON.parse(httpResponse.body).items.chest.id;
            request.get({url: 'https://us.api.battle.net/wow/item/' + itemID + '?locale=en_US&apikey=' + process.env.APIKEY},
                function optionalCallback(err, httpResponse) {
                    httpResponse.statusCode.should.equal(200);
                    console.log(JSON.parse(httpResponse.body).itemSpells[0].spell.description);
                    done();
                });
        });
    });
});
