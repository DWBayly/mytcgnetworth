const fs = require('fs');
function rf(file){
  return new Promise((resolve,reject)=>{
    fs.readFile(file,function(err,content){
      if(err){
        console.log(err);
      }
      let x = content.toString('utf8');
      let arr = x.split(',');
      //console.log(arr);
      resolve(arr);
    });
  });
}
function wf(file,data){
  return new Promise((resolve,reject)=>{
    fs.writeFile(file,data,(err)=>{
      if(err){
        reject(err);
      }else{
        resolve(true);
      }
    })
  });
}
var Autocomplete = require('autocomplete')
const mtg =require('mtgsdk');
let str = [];
let x =mtg.card.all()
let y = 0;
let z = 0;
x.on('data',cards=>{
    console.log(cards.name);
    str.push(cards.name);
    z++;
    if(z>1000){
        z=0;
        wf(`test${y}`,str);
        
        y++;
        if(y>3){
            return;
        }
    }
})

x.on('end',()=>{
    //console.log('its over!');
    //console.log(str);
    wf('test2.txt',str);
})
//console.log(str);


/*var request = require("request");
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



*/