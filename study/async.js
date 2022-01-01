const fs = require('fs');  //비동기는 동시에 일어나지 않는 다는 뜻 순서가 뒤죽박죽

fs.readFile('./readme.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('1번', data.toString());
});
fs.readFile('./readme.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('2번', data.toString());
});
fs.readFile('./readme.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('3번', data.toString());
});
fs.readFile('./readme.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('4번', data.toString());
});