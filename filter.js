
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

rf('filteredList.txt').then((name)=>{
  console.log(name.length);
})