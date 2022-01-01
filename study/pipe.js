const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('./readme3.txt', {highWaterMark: 16});
const zlibStream = fs.createGzip();  //압축하는것
//const writeStream = fs.createWriteStream('./writeme3.txt'); //readme3.txt 여기 내용 복사
const writeStream = fs.createWriteStream('./writeme4.txt'); //압축 파일
readStream.pipe(zlibStream).pipe(writeStream);