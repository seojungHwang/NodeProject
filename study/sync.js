const fs = require('fs'); //동기는 promises, callback 시용 x   동기는 동시에 일어난다는 뜻- 순서가 일정하게

let data = fs.readFileSync('./readme.txt');
    console.log('1번', data.toString());
     data = fs.readFileSync('./readme.txt');
    console.log('2번', data.toString());
     data = fs.readFileSync('./readme.txt');
    console.log('3번', data.toString());
     data = fs.readFileSync('./readme.txt');
    console.log('4번', data.toString());