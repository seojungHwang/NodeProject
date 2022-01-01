const fs = require('fs').promises;

fs.readFile('./readme.txt') 
.then((data)=> {
    console.log(data);
    console.log(data.toString());
    })
    .catch((err) => { //promises 에는 catch 필수!!
        throw err;
    });