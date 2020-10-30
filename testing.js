var arr = [1,2,3,4];

var text =arr[0];
var sql =' OR ';

for (let i = 1; i < arr.length; i++) {
    text+= sql + arr[i];
    
}

console.log(text);