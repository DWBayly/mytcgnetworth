let rf = require('./rf');
let arr = [];
rf.rf('sortedcardnames.txt').then((cards)=>{
	arr = cards; 
});
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
module.exports={autocomplete:autocomplete};