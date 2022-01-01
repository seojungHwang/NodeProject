const fs = require('fs'); 
const readStream = fs.createReadStream('./readme3.txt', {highWaterMark: 16});
//stream도 비동기!! 비동기는 에러처리를 해줘야함!!
//buffer 방식의 비해서 메모리를 줄일 수 있음!!
//대용량 파일서버를 할 때는 stream 방식이 필수!! 
//ex) 162byte -> 16byte 로 쪼개서 보낼 수 있음!!
//buffer는 쪼개서 못보내고 162byte 한번에만 보낼 수 있음

const data = [];
readStream.on('data', (chunk) => {
    data.push(chunk);
    console.log('data: ', chunk, chunk.length);
});
readStream.on('end', () => {
    console.log('end: ', Buffer.concat(data).toString());
});
readStream.on('error', (err) => {
    console.log('error: ', err);
});