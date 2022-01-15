const http = require("http"); //require 를 사용하면 해당 모듈을 사용가능! node를 설치하면 http 내장되어 있음

//req -> 클라이언트의 요청을 받음/ res -> 요청받은 것을 서버에 보냄
const server = http.createServer((req, res) => {
    if(req.url === "/") {
        res.write("<h1>Hello from node</h1>");
    }else{
        res.write(`<h1>You have entered this url : ${req.url}</h1>`);
        //`` -> 문자열과 변수를 적절히 같이 사용 가능
    }
    res.end(); //응답 마무리
});

server.listen(3000, () => {
    console.log("The server is listening on port 3000");
});