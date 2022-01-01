const http = require('http');
const fs = require('fs').promises;



// 비동기시 에러처리!!
const server = http.createServer(async (req, res) => {
    try{
        res.writeHead(200, {'Content-Type': 'text/html; charset=ytf-8'});
        const data = await fs.readFile('./server2.html');
        res.end(data)
    }catch(error){
        console.error(error);
        res.writeHead(200, {'Content-Type': 'text/plain; charset=ytf-8'});
        res.end(err.message);
    }
;})

//프로세스에 올려야함
    .listen(8080);
    server.on('listening', (error) => {
        console.log('8080번 포트에서 서버 대기 중입니다.');
    });
    server.on('error', (error) => {
        console.error(error);
    });


