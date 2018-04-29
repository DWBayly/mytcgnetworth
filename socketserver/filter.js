let fs = require('fs');
let rf = require('./rf');
let data = {};

fs.readFile('names.txt',function(err,content){
      if(err){
        console.log(err);
      }
      let temp  = JSON.parse(content);
      for(let x in temp){
        data[temp[x]]=temp[x];
      }
    });
function search(str){
  return data[str];
}

//setTimeout(function(){console.log(search('Avacyn, Angel of Hope'))},10000);
module.exports = {search:search};

/*let values = [];
rf('test2.txt').then((names)=>{
  //console.log(names);
  for(let x in names){
    if(!values.includes(names[x])){
      values.push(names[x]);
    }
  }
  wf('filteredList.txt',values);
})
let values = [];
let clean = true;
rf('filteredList.txt').then((names)=>{
  for(let x in names){
    if(!values.includes(names[x])){
      values.push(names[x]);
    }else{
      clean = false;
    }
  }
  console.log('The file is clean:'+clean);
})*/