function log(s){console.log(s)}
function isd(c){return((c>='0')&&(c<='9'))}
function g(r,c){try{return da[r][c]}catch(e){return '.'}}
function isq(x){return x!='.'&&!isd(x)}
function lq(r,c){return isq(g(r-1,c))||isq(g(r,c))||isq(g(r+1,c))}

const fs=require('node:fs')
let da=fs.readFileSync('d3p1','utf8').split("\n").filter(x=>x.trim().length>0)
da=da.map(e=>e.split(''))

let sum=0
for(let r=0;r<da.length;r++){
  let ns='', q=false
  for(let c=0;c<da[r].length;c++){
    let x=g(r,c)
    log('r='+r+' c='+c+' x='+x+' q='+q+' ns='+ns)
    if(isd(x)){ns+=x;q=q||lq(r,c)}
    else{
      qq=lq(r,c)
      if((q||qq)&&ns){sum+=parseInt(ns);log(ns)}
      ns=''
      q=qq}}
  if((q||lq(r,r.length))&&ns){sum+=parseInt(ns);log(ns)}
}



log(sum)

