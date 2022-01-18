const express = require("express");
const server = express(); //자바에서 클래스 역할(express라는 클래스를 메모리에 올림)


//특정 파일의 경로를 공통으로 지정 -> express.static/ 모든 리소스는 public을 참조
//경로 지정이므로 next 필요 없음!
server.use(express.static(__dirname + "/public")); 


//모든 함수는 use를 거치게 됨(미들웨어), get,post 방식이든 모든 클라이언트의 요청은 use(미들웨어)를 거치게 됨!
//next가 없으면 다음 작업으로 넘어가지 않음!
//공통적인 작업을 하기 위해 미들웨어를 사용!
server.use((req, res, next) => {
    console.log("Hi from client");
    req.user={id:"test"};
    next();
})

server.get("/", (req, res) => {
    //res.send("<h1>Hello from nodejs</h1>");
    console.log(req.user);
    res.sendFile(__dirname + "/index.html"); //view 파일을 불러옴(sendFile(__dirname)
});

server.get("/about", (req, res) => {
    res.sendFile(__dirname + "/about.html");
});

server.use((req, res) => {
    res.sendFile(__dirname + "/404.html");
});

server.listen(3000, (err) => {
    if(err) return console.log(err);
    console.log("The server is listening on port 3000");
});
