class Parent {
    constructor(val) {
        this.parentVal = val;
    }
    printParentVal() {
        console.log("printParentVal: " + this.parentVal);
    }
}
class Child extends Parent {
    constructor(val) {
        super(val);
        this.childVal = val;
    }
}
let child = new Child(12);
console.log(child, child.__proto__); // Child { parentVal: 12, childVal: 12 } Child {}
child.printParentVal(); // printParentVal: 12