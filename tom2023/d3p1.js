function log(s){console.log(s)}
function isd(c){return((c>='0')&&(c<='9'))}
function g(r,c){
  if(r<0||r>=da.length)return '.'
  if(c<0||c>=da[r].length)return '.'
  return da[r][c]}
function isq(x){return x!='.'&&!isd(x)}
function lq(r,c){return (
isq(g(r-1,c-1))||isq(g(r-1,c))||isq(g(r-1,c+1))||
isq(g(r,c-1))  ||               isq(g(r,c+1))||
isq(g(r+1,c-1))||isq(g(r+1,c))||isq(g(r+1,c+1))
)}

const fs=require('fs')
let da=fs.readFileSync('d3p1','utf8').split("\n").filter(x=>x.trim().length>0)
da=da.map(e=>e.split(''))

let sum=0
for(let r=0;r<da.length;r++){
  let ns='', q=false
  for(let c=0;c<da[r].length;c++){
    let x=g(r,c)
    if(isd(x)){ns+=x;q=q||lq(r,c)}
    else{
      if(q){sum+=parseInt(ns)}
      ns=''
      q=false}}
  if(q){sum+=parseInt(ns)}
}

log(sum)

