let fs = require('fs');
let data = {};

fs.readFile('mvids',function(err,content){
      if(err){
        console.log(err);
      }
      let data = JSON.parse(content);
    });
function search(str){
  return data[str];
}
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