let rf = require('./rf');
const fs = require('fs');
let arr = [];
fs.readFile('names.txt',function(err,content){
	if(err){
		console.log(err);
	}else{
		arr = JSON.parse(content);
	}
})
function autocomplete(str){
	str = str.toLowerCase();
	var re = new RegExp("^"+str+'.*');
	let results = [];
	let counter = 0;
	for(let x in arr){
		if(re.test(arr[x].toLowerCase())){
			counter++;
			results.push(arr[x]);
			if(counter>10){
				return results;
			}
		}

	}
	return results;	
}
//setTimeout(function(){console.log(autocomplete("Ava"))},2000);
module.exports={autocomplete:autocomplete};