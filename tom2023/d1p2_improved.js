function log(s){console.log(s)}
const fa=['zero','one','two','three','four','five','six','seven','eight','nine']
const ra=['0o','o1e','t2o','t3e','4','5e','6','7n','e8t','n9e']

const fs=require('node:fs')
let da=fs.readFileSync('d1p2','utf8')
fa.forEach((e,i)=>da=da.replaceAll(e,ra[i]))
da=da.split('').filter(c=>c=="\n"||(c>='0'&&c<='9')).join('')
da=da.split("\n").filter(x=>x.trim().length>0)

let sum=0
da.forEach(e=>sum+=parseInt(e[0]+e[e.length-1]))
log(sum)

