const http = require('http');
//서버 만드는 거!!
//비동기 형태임!!


const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=ytf-8'});
    res.write('<h1>Hello Node!</h1>'); //이것들도 stream
    res.write('<p>Hello Server</p>');
    res.end('<p>Hello Test</p>');
})

//프로세스에 올려야함
    .listen(8080);
    server.on('listening', (error) => {
        console.log('8080번 포트에서 서버 대기 중입니다.');
    });
    server.on('error', (error) => {
        console.error(error);
    });


    // 이렇게도 가능!! 서버 두개 돌리기! 
// const server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/html; charset=ytf-8'});
//     res.write('<h1>Hello Node!</h1>'); //이것들도 stream
//     res.write('<p>Hello Server</p>');
//     res.end('<p>Hello Test</p>');
// })

// //프로세스에 올려야함
//     .listen(8090);