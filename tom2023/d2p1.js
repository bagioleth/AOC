function log(s){console.log(s)}
function pg(s){
  let x={id:0,r:0,g:0,b:0}
  let c=s.indexOf(":")
  x.id=parseInt(s.substring(5,c))
  let a=s.substring(c+2).split(' ')
  for(let i=0;i<a.length;i+=2){
    let n=parseInt(a[i].trim())
    let h=(''+a[i+1]).charAt(0);
    if(h=='r'&&n>x.r)x.r=n;
    if(h=='g'&&n>x.g)x.g=n;
    if(h=='b'&&n>x.b)x.b=n;}
  x.ok=x.r<13&&x.g<14&&x.b<15
  return x}
  
const fs=require('node:fs')
let da=fs.readFileSync('d2p1','utf8').split("\n").filter(x=>x.trim().length>0)
da=da.map(e=>pg(e))

let sum=0
da.forEach(e=>sum+=e.ok?e.id:0)
log(sum)

