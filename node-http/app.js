const express = require("express");
const server = express(); //자바에서 클래스 역할(express라는 클래스를 메모리에 올림)

server.get("/", (req, res) => {
    //res.send("<h1>Hello from nodejs</h1>");
    res.sendFile(__dirname + "/index.html"); //view 파일을 불러옴(sendFile(__dirname)
});

server.get("/about", (req, res) => {
    res.sendFile(__dirname + "/about.html");
});

server.listen(3000, (err) => {
    if(err) return console.log(err);
    console.log("The server is listening on port 3000");
});
