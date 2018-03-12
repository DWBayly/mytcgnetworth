var request = require("request");
var rp = require('request-promise');
require('dotenv').config();
var options = {
    method: 'POST',
    uri: 'https://www.echomtg.com/api/user/auth/',
    qs: {
       email:process.env.email,
       password:process.env.password
    },
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically stringifies the body to JSON
};

rp(options)
    .then(function (response) {
        console.log(response);
        // POST succeeded...
        let token = response.token;
        options.uri = 'https://www.echomtg.com/api/inventory/view/'
        options.qs.start = 0;
        options.qs.limit= '100';
        options.qs.order = 'desc';
        options.qs.auth = token;
        options.method = 'GET';
        rp(options).then(function(res){
            console.log(res);
        })
    })
    .catch(function (err) {
        // POST failed...
        console.log(err);
    });



