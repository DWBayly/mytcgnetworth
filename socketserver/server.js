require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3001;
const SocketServer = require('ws').Server;
const acomplete = require('./acomplete');
const filter = require('./filter');
const list = require('./list');
let rp = require('request-promise');
var triecomplete = require("triecomplete");
const server = express()// Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));
const wss = new SocketServer({server});
/*var options = {
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
        options.qs.auth = token;
    })
    .catch(function (err) {
        // POST failed...
        console.log(err);
    });*/


process.on('unhandledRejection',err=>{
	console.log(err.message);
});
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(data));
  });
};
wss.on('connection', (ws) => {
	console.log('Connected');
	ws.on('message', function(message) {
		console.log(message);
		let data = JSON.parse(message);
		let response = {};
		switch(data.type){
			case 'fill':
				response.data = acomplete.autocomplete(data.str)
				response.type = 'fill';
			break;
			case 'getCards':
				//console.log(data.card);
				response.data = list.getCard(data.card);
				console.log(response.data);
				response.type = 'getCards';
			break;
			case 'getPrice':
				response.data = list.getPrice();
				response.type = 'setCardPrice'
			break;
			default:
				console.log(data);
				response.type = 'default';
			break;
		}
		console.log(response);
		wss.broadcast(response);
	});
	ws.on('close', () => {
		console.log('Client disconnected');
	});
	ws.on('error', () => console.log('errored'));
});