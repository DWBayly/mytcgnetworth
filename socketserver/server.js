require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3001;
const SocketServer = require('ws').Server;
const acomplete = require('./acomplete');
const filter = require('./filter');
const list = require('./list');
const loadsave = require('./loadsave');
let rp = require('request-promise');
var triecomplete = require("triecomplete");
const server = express()// Make the express server serve static assets (html, javascript, css) from the /public folder
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
	loadsave.load('listnames.txt').then(function(result){
		wss.broadcast({
			type:"nameList",
			data:result
		})
	});
	ws.on('message', function(message) {
		console.log(message);
		let data = JSON.parse(message);
		let response = {};
		switch(data.type){
			case 'fill':
				response.data = acomplete.autocomplete(data.str)
				response.type = 'fill';
				wss.broadcast(response);
			break;
			case 'getCards':
				response.type = 'getCards';
				list.getCard(data.card).then(function(result){
					response.data = result;
					response.data.index = 0;
					response.data.quantity=1;
					wss.broadcast(response);
				});

			break;
			case 'getPrice':
				response.type = 'setCardPrice'
				list.getCard(data.card).then(function(result){
					response.data= result;
					wss.broadcast(response);
				});
			break;
			case 'save':
				loadsave.save(data.name,data.list).then(function(){
					loadsave.load('listnames.txt').then(function(result){
						wss.broadcast({
							type:"nameList",
							data:result
						})
					});
				});
			break;
			case 'load':
				loadsave.load(data.name).then(function(result){
					response.type = 'load';
					response.data = result;
					wss.broadcast(response);
				});
			break;

			case 'getSaveList':
			break;
			default:
				console.log(data);
				response.type = 'default';
			break;
		}
		console.log(response);

	});
	ws.on('close', () => {
		console.log('Client disconnected');
	});
	ws.on('error', () => console.log('errored'));
});