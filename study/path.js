const path = require('path');
//경로처리시 왠만하면 path 사용하면 편함!

console.log(path.join(__dirname, '..', 'var.js')); //const os = require('os');
//  /Users/hwangseojeong/VSCode/var.js
console.log(path.resolve(__dirname, '..', 'var.js')); //절대경로
// /Users/hwangseojeong/VSCode/var.js