const fs = require('fs');
function load(name){
	return new Promise(function(resolve,reject){
		fs.readFile(name,function(err,content){
			if(err){
				reject(err);
			}
			console.log(JSON.parse(content));
			resolve( JSON.parse(content));
		});
	});
}
function save(name,list){
	return new Promise(function(resolve,reject){
		fs.writeFile(name,JSON.stringify(list),(err)=>{
			if(err){
				console.log(err);
			}
		})
		fs.readFile("listnames.txt",function(err,content){
			content = JSON.parse(content);
			content.push(name);
			fs.writeFile("listnames.txt",JSON.stringify(content),function(err){
				if(err){
					console.log(err);
				}else{
					resolve(true);
				}
			});
		});
	});
}
//save("test.txt",['test','text2']);
module.exports={
	load:load,
	save:save
}