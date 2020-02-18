function Parent(value) {
    this.parentVal = value;
}
Parent.prototype.print = function() {
    console.log(this.parentVal);
}

function Child(value) {
    Parent.call(this, value);
}
Child.prototype = new Parent();
const child = new Child(123);
console.log(child, child.__proto__); // Parent { parentVal: 123 } Parent { parentVal: undefined }
child.print(); // 123
// 调用构造函数，把parentVal的属性作为自己的属性,实例对象的的__proto__指向其构造函数的prototype
// 缺点是子类的__proto__多了一个相同的属性，造成内存浪费