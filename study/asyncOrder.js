const fs = require('fs');  //순서대로 실행 //동기랑 무슨 차이? -> asyncOrder를 10번 실행하면 백그라운드로 4개의 작업이 하나의 묶음으로 동시에 들어가지만
                                        // 동기를 10번 실행 시 백그라운드에 40개의 작업으로 들어감
                                        //callback 헬이 발생하므로 promises로 작업하는것이 편할듯!

fs.readFile('./readme.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('1번', data.toString());
    fs.readFile('./readme.txt', (err, data) => {
        if (err) {
            throw err;
        }
        console.log('2번', data.toString());

        fs.readFile('./readme.txt', (err, data) => {
            if (err) {
                throw err;
            }
            console.log('2번', data.toString());
            fs.readFile('./readme.txt', (err, data) => {
                if (err) {
                    throw err;
                }
                console.log('3번', data.toString());

                fs.readFile('./readme.txt', (err, data) => {
                    if (err) {
                        throw err;
                    }
                    console.log('4번', data.toString());
                });
            });
        });
    });
});

