require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3001;
const SocketServer = require('ws').Server;
const acomplete = require('./acomplete');
let rp = require('request-promise');
var triecomplete = require("triecomplete");
const server = express()

// Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));
const wss = new SocketServer({server});
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
		//console.log(message);
		let data = JSON.parse(message);
		let response = {};
		switch(data.type){
			case 'fill':
				response.data = acomplete.autocomplete(data.str)
				response.type = 'fill';
			break;
			case 'getCards':
			break;
			default:
				console.log(data);
				response.type = 'default';
			break;
		}
		wss.broadcast(response);
	});
	ws.on('close', () => {
		console.log('Client disconnected');
	});
	ws.on('error', () => console.log('errored'));
});