function log(s){console.log(s)}
function isd(c){return((c>='0')&&(c<='9'))} 
function itf(a,f){let v={val:0}
  for(let i=0;i<a.length;i++)if(!f(a[i],v))break;
  return v}
function ff(a,s){}
const fa=['0','1','2','3','4','5','6','7','8','9','zero','one','two','three','four','five','six','seven','eight','nine']

const fs=require('node:fs')
let da=fs.readFileSync('d1p2','utf8').split("\n").filter(x=>x.trim().length>0)
da=da.map((e,i)=>{
  let fd='',fi=e.length,ld='',li=-1
  fa.forEach((ee,ii)=>{
    let i=e.indexOf(ee)
    if(i>-1&&i<fi){fd=ee;fi=i}})
  fa.forEach((ee,ii)=>{
    let i=e.lastIndexOf(ee)
    if(i>-1&&i>li){ld=ee;li=i}})
  return fd+ld})

log('da:'+da)
function d2d(s){
  s=s.replaceAll('zero','0')
  .replaceAll('one','1')
  .replaceAll('two','2')
  .replaceAll('three','3')
  .replaceAll('four','4')
  .replaceAll('five','5')
  .replaceAll('six','6')
  .replaceAll('seven','7')
  .replaceAll('eight','8')
  .replaceAll('nine','9');
  return s}

let sum=0
da.forEach(e=>sum+=parseInt(d2d(e)))
log(sum)

