require('./dep2');

module.exports = {
    hello: 'test',
}; //빈 객체임(무한 반복을 막기 위해) 순환참조하는 상황이 나오지 않도록 하는게 좋음
    //dep1이 dep2를 require 하고, dep2가 dep1을 require함

   // process.uptime() 노드 프로세스 - 프로그램이 돌고 있는거 초 확인
   // process.exit(1) - 서버에서 에러가 있을경우 에러를 알리고 종료하기 위해 사용
   // process.exit(0) - 잘은 안쓰지만 프로세스 종료시 사용