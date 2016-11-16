'use strict';

class Test {
  constructor() {

  }
  nonStaticOperation () {
    console.log(this instanceof Test);
  }
  static staticOperation () {
    console.log('static operation');
  }
}


let t = new Test();
t.nonStaticOperation();
Test.staticOperation();

console.log(t instanceof Test);
