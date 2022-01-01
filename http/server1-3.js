const https = require('https');
const fs = require('fs');


//readFileSync -> 쓰는 경우 1. 딱 한번만 쓰거나 2. 서버 시작 전 초기화 할 때
https.createServer({
  cert: fs.readFileSync('도메인 인증서 경로'),
  key: fs.readFileSync('도메인 비밀키 경로'),
  ca: [
    fs.readFileSync('상위 인증서 경로'),
    fs.readFileSync('상위 인증서 경로'),
  ],
}, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
})


//https는 포트가 443(그래야 생략가능)
  .listen(443, () => {
    console.log('443번 포트에서 서버 대기 중입니다!');
  });