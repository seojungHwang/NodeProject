//const value = require('./var');
//console.log(value);

const {odd , even} = require('./var'); //import {odd,even} from './var' ; 이렇게도 쓰지만 동작 방식이 조금 다름! 최순문법
//global 생략가능 원래는 global.require

console.time('test');

function checkOddOrEven(number){
    if (number % 2){
        return odd;
    }else{
        return even;
    }
}

console.timeEnd('test'); //코드 효율 알고 싶을 때 사용 time 으로부터 시간이 얼마나 걸리나!
module.exports = checkOddOrEven;

