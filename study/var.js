const odd = '홀수입니다';
const even = '짝수입니다';


//module을 하면 이 파일이 모듈이 되어서 다른 파일에서 사용 가능!!  (export default 이렇게도 씀 최신문법)
module.exports = {
    odd,
    even,
};

//export.odd = odd;
//export.even = even; 이렇게 module 생략가능
//module.exports === exports === {} 빈객체로 되어 있음