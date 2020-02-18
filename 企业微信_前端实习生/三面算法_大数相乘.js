/** @format */

class Multiply {
	constructor(str1, str2) {
		// 判断类型
		if (!this.isString(str1) || !this.isString(str2)) {
			throw TypeError("Must Be String");
		}
		// 大端变小端，方便处理
		this.arrA = str1
			.split("")
			.map(v => Number(v))
			.reverse();
		this.arrB = str2
			.split("")
			.map(v => Number(v))
			.reverse();
		// 判断是有效数值

		// 结果数组,x位乘以y位最多x+y位
		this.resultArr = new Array(this.arrA.length + this.arrB.length - 1).fill(0);
		this._main();
	}
	_main() {
		// 思路：a数组下标x与b数组下标y相乘结果，等于结果下标x+y处的·指
		let arrA = this.arrA;
		let arrB = this.arrB;
		let lenA = this.arrA.length;
		let lenB = this.arrB.length;
		// 模拟人的算数
		for (let x = 0; x < lenA; x++) {
			for (let y = 0; y < lenB; y++) {
				// 先直接乘，不考虑进位，最后遍历一遍就行了
				this.resultArr[x + y] += arrA[x] * arrB[y]; // bug tip
			}
		}
		// 处理进位
		let resLen = this.resultArr.length;
		let resultArr = this.resultArr;
		let more = 0; //进位值，初始化为0
		for (let index = 0; index < resLen; index++) {
			let sum = resultArr[index] + more;
			resultArr[index] = sum % 10; // 10进制
			more = Math.floor(sum / 10); // 获得进位值
		}
		// 一定考虑more，最后一位进位
		// 处理最后一个的进位，例如[1,1,123]=>[1,1,3,2,1],把最后一位取出来，分解扭转push到数组中
		if (more !== 0) {
			this.resultArr.push(more);
		}
	}
	// 结果
	result() {
		return this.resultArr.reverse().join("");
	}
	isString(str) {
		return typeof str === "string";
	}
}
function mission() {
	let str1 = "123456789111111";
	let str2 = "987654321111111";
	let ret = new Multiply(str1, str2);
	console.log(ret.result());
}
mission();
