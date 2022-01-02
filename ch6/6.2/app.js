const dotrenv = require('dotenv');

const express = require('express');
const path = require('path'); //경로처리
const morgen = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');

dotrenv.config();
const indexRouter = require('./routes'); //Routes
const userRouter = require('./routes/user');

const app = express();


app.set('port', process.env.PORT || 3000); //서버에다가 속성을 심는 것(전역변수 같은 느낌)

//미들웨서는 내부적로 next를 가지고 있음
//morgen 요청과 응답을 기록하는 라우터 (GET / 200 2.047 ms - 15)
app.use(morgen('dev'));
//app.use('요청경로', express.static('실제경로'));
app.use('/', express.static(path.join(__dirname, 'public'))); //미들웨어도 순서가 중요 
                //static 미들웨어는 파일이 존재한다면 다음 next로 넘어가지 않음
app.use(cookieParser(process.env.COOKIE_SECRET)); //dotenv
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
    }
}));
//중요!!!!!!!!  로그인 시에만 사진을 보게 하기 위함!!!!!!!!!!!
// app.use('/', (req, res, next) => {
    // if (req.session.id){
    //     express.static(path.join(__dirname, 'public') (req, res, next)
    // }else{
    //     next();
    // }
//     
// }); 
app.use(express.json());  //bodyParser //클라이언트가 보내는 json 데이터
app.use(express.urlencoded({extended: true})); //bodrParser //urlencoded -> form submit 할 때(form 파싱)
                            //true면 qs(훨씬 더 강력-추천), false면 querystring
app.use(multer.array());

app.use('/', indexRouter); //app.use에 Router 합쳐줌
app.use('/user', userRouter);


///////////////////////multer////////////////////////////
//multer 사진 올리기!!
const multer = require('multer');
const fs = require('fs');

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'multipart.html'));
});
app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file);
  res.send('ok');
});




//////////////////////////////////////////////////////////////////////////////
app.use((req, res, next) => {
    //req.session
    //app.set('hello', 'testpassword'); //전체 공유됨! 이러면 안됨!
    //req.session.data = 'testpassword'; //단점: 다음 로그인 시 비번 남아있음
    req.data = 'testpassword'; //1회성
});


app.get('/', (req, res, next) => {
    //app.get('hello');
    //req.session.data; //testpassword
    req.data //testpassword

    req.cookies // {mycookie: 'test'} 
    req.signedCookies; //서명화된 쿠키(암호)
    req.body.name //클라이언트에서 보내는 name //bodrParser
    req.session.id = 'hello'; //이거 자체가 사용자의 아이디(고유 세션) 개인의 저장공간

    //쿠키 설정
    res.cookie('name', encodeURIComponent(name), {
        expires: new Date(),
        httpOnly: true,
        path: '/',
    });
    //쿠키 지우기
    res.clearCookie('name', encodeURIComponent(name), {
        httpOnly: true,
        path: '/',
    });
    res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/', (req, res) => {
    res.send('hello express');
});

app.get('/category/javaScript', (req, res) => {
    res.send('hello javaScript');
});


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