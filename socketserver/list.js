
var rp = require('request-promise');
require('dotenv').config();
var options = {
    method: 'GET',
    uri: "http://api.tcgplayer.com/catalog/products",
    qs: {
        categoryid:1,
        productName:"Tarmogoyf"
    },
    headers: {
        Accept:"application/json",
        Authorization: `bearer ${process.env.bearer_token}`
    },
    json: true // Automatically stringifies the body to JSON
};
function getCard(name){
    options.uri = "http://api.tcgplayer.com/catalog/products";
    options.qs ={
        categoryid:1,
        productName:name
    };
    return new Promise((resolve,reject)=>{ 
        rp(options).then(function(response){
            console.log(response);
            getPriceRecursive(response,0,[]).then(function(result){
                    response.price = result;
                    //console.log(response);
                    resolve(response);
            });
        }).catch(function(err){
            reject(err);
        });
    });
}
function getPriceRecursive(response,index,arr){
    return new Promise (function(resolve,reject){
        if(index >=response.results.length){
            resolve(arr);
        }
        getPrice(response.results[index].productConditions[0].productConditionId).then(function(pricedata){
            console.log("Price Data : "+pricedata);
            if(!pricedata){
                arr.push({success:false,
                    errors:[],
                    results:[{productConditionId:response.results[index].productConditions[0].productConditionId,
                    price:0,
                    lowestRange:0,
                    highestRange:0}]
                })
            }else{
                arr.push(pricedata);
            }
            getPriceRecursive(response,index+1,arr).then(function(result){
                resolve(result);
            });
        });
    });

}
function getPrice(pid){
    options.uri=`http://api.tcgplayer.com/pricing/marketprices/${pid}`
    return new Promise((resolve,reject)=>{ 
        rp(options).then(function(response){
            console.log(response);
            resolve(response);
        }).catch(function(err){
            resolve(false);
        });
    });
}
//setTimeout(function(){getCard("Tarmogoyf")},2000);
module.exports = {
    getCard:getCard,
    getPrice:getPrice
}
/*rp(options)
    .then(function (response) {
        console.log(response);
        options.qs.auth = response.token;
    })
    .catch(function (err) {
        console.log(err);
    });

function addList(name){
    options.method="POST"
    options.uri ="https://www.echomtg.com/api/lists/create/"
    options.qs.name = name;
    options.qs.description = "test";
    return new Promise((resolve,reject)=>{
        rp(options).then(function(response){
            console.log(response);
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}
function getList(id){
    options.method="GET";
    options.uri = "https://www.echomtg.com/api/lists/get/";
    options.qs.list = id;
    return new Promise((resolve,reject)=>{
        rp(options).then(function(response){
            console.log(response);
            resolve(response);
        }).catch(function(err){
            reject(err);
        });
    });
}
function addCard(listname,mvid){
    options.method="POST";
    options.uri = ""
    return new Promise((resolve,reject)=>{
        rp(options).then(function(response){
            console.log(response);
            resolve(true);
        }).catch(function(err){
            reject(err);
        });
    });
}
setTimeout(function(){addCard("10477",439390).then(function(res){
    console.log(res);
})},10000);
*/