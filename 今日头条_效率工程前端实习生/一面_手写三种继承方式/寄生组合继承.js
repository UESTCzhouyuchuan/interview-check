/** @format */

function Parent(value) {
	this.parentVal = value;
}
Parent.prototype.print = function() {
	console.log(this.parentVal);
};

function Child(value) {
	Parent.call(this, value);
}
Child.prototype = Object.create(Parent.prototype, {
	constructor: {
		value: Child,
		enumerable: false,
		writeable: true,
		configurable: true,
	},
});
const child = new Child("child123");
console.log(child, child.__proto__.__proto__); // Child { parentVal: 'child123' } Parent { print: [Function] }
child.print(); // child
