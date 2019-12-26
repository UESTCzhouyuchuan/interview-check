/** @format */
/**
 * 升级版，加入base参数,实现n进制
 * 封装成类
 * 增加判断符号功能
 */
class calculate {
	constructor(stringA, stringB, base) {
		if (typeof stringA !== "string" || typeof stringB !== "string") {
			throw TypeError("Input StringA、StringB Not String!");
		}
		if (typeof base !== "number") {
			throw TypeError("Input Base Not Number");
		}
		/**
		 * 做预处理
		 * 获得stringA，stringB的数组形式，再逆转方便处理
		 * 处理符号位，获取有效数值
		 * 用1表示正，0表示负
		 */
		this.symbolA = 1;
		this.symbolB = 1;
		if (stringA[0] === "-") {
			this.symbolA = 0;
			stringA = stringA.slice(1);
		}
		if (stringB[0] === "-") {
			this.symbolB = 0;
			stringB = stringB.slice(1);
		}
		this.arrayA = stringA
			.split("")
			.map(v => Number(v))
			.reverse();
		this.arrayB = stringB
			.split("")
			.map(v => Number(v))
			.reverse();
		this.base = base;
	}
	show() {
		console.log("symbolA:", this.symbolA);
		console.log("arrayA:", this.arrayA);
		console.log("symbolB:", this.symbolB);
		console.log("arrayB:", this.arrayB);
	}
	plus() {
		let res;
		/**
		 * 四种符号情况
		 * 正+正
		 * 正+负
		 * 负+正
		 * 负+负
		 */
		if (this.symbolA === 1 && this.symbolB === 1) {
			res = this._plus(this.arrayA, this.arrayB, 1);
		} else if (this.symbolA === 1 && this.symbolB === 0) {
			res = this._subtract(this.arrayA, this.arrayB, 1);
		} else if (this.symbolA === 0 && this.symbolB === 1) {
			res = this._subtract(this.arrayB, this.arrayA, 1);
		} else {
			res = this._plus(this.arrayB, this.arrayA, 0);
		}
		return res;
	}
	_plus(arrayA, arrayB, symbol) {
		/*
		 * 比较数组长度
		 * 把结果result初始化为长度较长的字符数组
		 */
		let result;
		if (arrayA.length > arrayB.length) {
			result = arrayA;
		} else {
			result = arrayB;
		}
		let carry = 0,
			carryNext = 0; // 定义当前进位，以及下一位进位
		/**
		 * 直接遍历最长的字符串的数组
		 * 一次遍历就可
		 * 判断短的字符串数组是否有有效值
		 */
		result = result.map((value, index) => {
			let valueA = arrayA[index] ? arrayA[index] : 0; // 可能当前超出数组范围，做判断
			let valueB = arrayB[index] ? arrayB[index] : 0;
			carry = carryNext;
			carryNext = this.hasCarry([valueA, valueB, carry], this.base) ? 1 : 0; // 是否进位
			return (valueA + valueB + carry) % this.base; // 异或得到result当前下标值
		});
		// 最高位进位加一位
		if (carryNext) {
			result.push(1);
		}
		if (symbol === 0) {
			result.push("-");
		}
		return result.reverse().join("");
	}
	subtract() {
		let res;
		/**
		 * 四种符号情况
		 * 正-正
		 * 正-负
		 * 负-正
		 * 负-负
		 */
		if (this.symbolA === 1 && this.symbolB === 1) {
			res = this._subtract(this.arrayA, this.arrayB, 1);
		} else if (this.symbolA === 1 && this.symbolB === 0) {
			res = this._plus(this.arrayA, this.arrayB, 1);
		} else if (this.symbolA === 0 && this.symbolB === 1) {
			res = this._plus(this.arrayA, this.arrayB, -1);
		} else {
			res = this._subtract(this.arrayB, this.arrayA, 1);
		}
		return res;
	}
	_subtract() {}
	hasCarry(numbers) {
		return (
			numbers.reduce((total, value, index) => {
				return total + value;
			}) >= base
		);
	}
}
let stringA = "-12";
let stringB = "-11";
let base = 3;
let cal = new calculate(stringA, stringB, base);
cal.show();
console.log(cal.plus());
