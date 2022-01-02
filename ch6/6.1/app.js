const express = require('express');
const path = require('path'); //경로처리
const morgen = require('morgan');

const app = express();

app.set('port', process.env.PORT || 3000); //서버에다가 속성을 심는 것(전역변수 같은 느낌)

//morgen 요청과 응답을 기록하는 라우터
app.use(morgen('dev'));

// app.get('/', (req, res) => {
//     res.send('hello express');
// });
// app.listen(3000, () => {
//     console.log('익스프레스 서버 실행');
// });


//next가 있어야 다음 라우터중에 일치하는 것을 찾아가 실행함!(위에서 아래로 실행!)
//미들웨어는 이부분 ->  ((req,res,next) => {  console.log('모든 요청에 실행하고 싶어요'); next(); })
//함수가 미들웨어! use 에 장착한 것일 뿐!
app.use((req, res, next) => {
    console.log('1 모든 요청에 실행하고 싶어요');
    next();
}, (req, res, next) => {
    console.log('2 모든 요청에 실행하고 싶어요');
    next();
}, (req, res, next) => {
    console.log('3 모든 요청에 실행하고 싶어요');
    next();
}); //연달아 실행 가능

// 이러면 about에서만 실행!
// app.use('/about', (req, res, next) => {
//     console.log('모든 요청에 실행하고 싶어요');
//     next();
// })


app.use((req, res, next) => {
    console.log('1 모든 요청에 실행하고 싶어요');
    next();
}, (req, res, next) => {
    try{
        console.log('에러');
    }catch(error){
        next(error); //next의 인수가 들어가 있으면 처리 -> 바로 에러처리 미들웨어로 넘어감
    }
});



//메소드와 주소가 있는 것을을 라우터라고 부름!
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html')); //path.join(__dirname) 절대 경로 잡아줌
    //res.send('안녕하세요');
    //res.json({hello: 'test'}); -> 한 라우터에서 여러번 처리하면 에러남!
    //요청한번에 응답한번 해야함!
}); //sendFile -> 그때끄때 알아서 전송해줌


//같은 주소를 가지고 있을때
app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html')); 
    if(true){ //중복을 줄이기 위한 코드
        next('route'); //다음 라우터가 실햄됨( 밑에 실행되나요는 실행 안됨!)
    }else{
        next();
    }
},(req, res) => {
    console.log('살행되나요?');
}); 

app.get('/test', (req, res) => {
    console.log('살행됨');
}); 


app.get('/json', (req, res) => {
    // res.writeHead(200, {'Content-Type': 'application/json'});
    // res.end(JSON.stringify({hello: 'test'}));
    //원래 이형태를 express가 밑에 한줄의 형태로 바꿔줌

   res.json({hello: 'test'});  //응답을 보낼 뿐! 종료 아님
   console.log('hello test');
}); //sendFile -> 그때끄때 알아서 전송해줌


//이런것도 다 미들웨어! post에 장착한것!
app.post('/', (req, res) => {
    res.send('hello express');
});

app.get('/category/javaScript', (req, res) => {
    res.send('hello javaScript');
});

//와일드 카드 (라우트 매개변수 req.params) -> 수백개의 라우터가 있을때 이렇게 하나로 만들 수 있음  //와일드 카드는 보통 다른 미들웨어 밑에서 씀!
//와일드카드 라우터가 있으면 404안뜸!
app.get('/category/:name', (req, res) => {
    res.send('hello wildcard');
});

app.get('/about', (req, res) => {
    res.send('hello express');
});

//* 어떤 get 요청에 대해서 다 처리 하겠다! (범위가 넓은 라우터를 밑에 작성! 위에 작성하면 얘부터 다 걸려서 실행 안됨..)
app.get('*', (req, res) => {
    res.status(200).send('hello everybody');
    //status(200) 기본적으로 모든 라우터에 200이 생략되어 있음
});


//이렇게 커스텀 가능(에러는 아님/ 404미들웨어)
app.use((req, res, next) => {
    console.error(err);
    res.status(404).send("404 에러");
});

//보통 아래서 에러 미들웨어 넣어줌(4개 다 써줘야함! next 안쓰면 다른 함수로 인식함)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("에러 발생");
});

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
});