function log(s){console.log(s)}
function isd(c){return((c>='0')&&(c<='9'))} 
function itf(a,f){let v={val:0}
  for(let i=0;i<a.length;i++)if(!f(a[i],v))break;
  return v}

const fs=require('node:fs')
let da=fs.readFileSync('d1p1','utf8').split("\n").filter(x=>x.trim().length>0)
da=da.map(x=>x.split('').filter(isd).join(''))

let sum=itf(da, (x,v)=>{v.val+=parseInt(x[0]+x[x.length-1]);return true}).val
log(sum)

