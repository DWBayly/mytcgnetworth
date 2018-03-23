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
module.exports = {
  rf:rf,
  wf:wf
};