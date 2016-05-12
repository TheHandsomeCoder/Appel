const http = require('http');
const fortune = require('fortune');
const jsonApiSerializer = require('fortune-json-api');
const nedbAdapter = require('fortune-nedb');


const instance = new fortune({
    fencer: {
        firstName: { type: String },
        lastName: { type: String },
        gender: { type: String },
        club: { type: String },
        iffNumber: { type: String },
        results: {link : 'result', isArray: true, inverse:'fencer'}
    },

    result: {
        placing: { type: Number },
        fencer: {link: 'fencer', isArray: false, inverse: 'results'},
        weapon: { type: String },
        points: { type: Number },
        event: {link: 'event', isArray: false, inverse: 'results'}
    },

    event: {
        eventDate: {type: Date},
        results: {link: 'result', isArray: true, inverse: 'event'},
        weapon: { type: String },
        competition: {link: 'competition', isArray: false, inverse: 'events'}
    },

    competition: {
        name: { type: String },
        shortName: { type: String },
        events: {link: 'event', isArray: true, inverse: 'competition'}
    }
});


// `instance` is an instance of Fortune.js.
const listener = fortune.net.http(instance, {
    serializers: [
       // The `options` object here is optional.
       [ jsonApiSerializer, {/*options*/} ]
    ],
    //adapter: [ nedbAdapter, {/*options*/} ]
});

// The listener function may be used as a standalone server, or
// may be composed as part of a framework.
const server = http.createServer(function(request, response){
    response.setHeader('Access-Control-Allow-Origin', '*');
    return listener(request, response);
});

server.listen(9000);
console.log("Listening on port: 9000");