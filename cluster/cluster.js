const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`마스터 프로세스 아이디: ${process.pid}`);
  // CPU 개수만큼 워커를 생산
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork(); //워커 종료되었을 떄 워커 새로 만들어줌
  }
  // 워커가 종료되었을 때
  cluster.on('exit', (worker, code, signal) => {
    console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
    console.log('code', code, 'signal', signal);
    cluster.fork();
  });
} else {
  // 워커들이 포트에서 대기
  http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Cluster!</p>');
    setTimeout(() => { // 워커 존재를 확인하기 위해 1초마다 강제 종료
      process.exit(1);
    }, 1000);
  }).listen(8086); //여러개의 서버를 포트 하나로 쓸 수 있음!!

  console.log(`${process.pid}번 워커 실행`);
}

//cluster
//기본적으로 싱글 스레드인 노드가 CPU코어를 모두 사용할 수 있게 해주는 모듈
//포트를 공유하는 노드 프로세스를 여러개 둘 수 있음
//요청이 많이 들어왔을 때 병렬로 실행된 서버의 개수만큼 요청이 분산됨
//서버에 무리가 덜 감
//코어가 8개인 서버가 있을 때, 성능이 8배가 되는 것은 아니지만 개선됨 : 보통은 코어 하나만 활용
//cluster로 코어 하나당 노드 프로세스 하나를 배정 가능
//단점: 컴퓨터 자원(메모리, 세션 등) 공유 못함 -> Redis등 별도 서버로 해결
//1코어가 여러 쓰레드를 처리