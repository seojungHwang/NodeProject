console.log(this);
console.log(this === module.exports)
//노드 this 는 module.exports 이거!! this.odd 이렇게도 쓸 수 있지만 잘 쓰지 않음!

function a (){
    console.log(this === global); //여기서 this는 글로벌
}
a();