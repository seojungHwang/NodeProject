const fs = require('fs').promises; //비동기 방식 promises, callback 사용  - 순서대로 실행x

fs.writeFile('./writeme.txt', '글이 입력됨') 
.then(()=> {
    
    })
    .then(() => {
        console.log(data.toString());
    })
    .catch((err) => {
        throw err;
    });