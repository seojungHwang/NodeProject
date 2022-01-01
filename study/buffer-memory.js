const fs = require('fs');

console.log('before: ', process.memoryUsage().res);

const readStream = fs.createReadStream('./big.txt');
const writeStream = fs.createWriteStream('./big3.txt');
readStream.on('end', () => {
    console.log('buffer: ', process.memoryUsage().rss);
})
