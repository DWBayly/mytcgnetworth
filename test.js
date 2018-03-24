/*const fs = require('fs');
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
  let str = JSON.stringify(data);
  return new Promise((resolve,reject)=>{
    fs.writeFile(file,str,(err)=>{
      if(err){
        reject(err);
      }else{
        resolve(true);
      }
    })
  });
}
const mtg =require('mtgsdk');
let str = {};
let x =mtg.card.all()
x.on('data',cards=>{
    if(str[cards.name]===undefined){
      str[cards.name]=[];
    }
    str[cards.name].push(cards);

    console.log(cards.multiverseid);

})

x.on('end',()=>{
    console.log('its over!');
    wf(`mvids`,str);
    //console.log(str);
    //wf('test2.txt',str);
})
//console.log(str);*/
/*
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
        options.uri = 'https://www.echomtg.com/api/data/card_reference/'
        options.qs.start = 0;
        options.qs.auth = token;
        options.method = 'GET';
        rp(options).then(function(res){
            console.log(res);
        })
    })
    .catch(function (err) {
        // POST failed...
        console.log(err);
    });*/