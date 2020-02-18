/** @format */
/**
 *
 * 第一版
 */
/**
 *
 * @param {字符串A} stringA
 * @param {字符串B} stringB
 */
function plus({ stringA, stringB }) {
	if (typeof stringA !== "string" || typeof stringB !== "string") {
		throw TypeError("Not String!");
	}
	/**
	 * 做预处理
	 * 获得stringA，stringB的数组形式，再逆转方便处理
	 * 比较数组长度
	 * 把结果result初始化为长度较长的字符数组
	 */
	let arrayA = stringA
			.split("")
			.map(v => Number(v))
			.reverse(),
		arrayB = stringB
			.split("")
			.map(v => Number(v))
			.reverse();
	let result;
	if (arrayA.length > arrayB.length) {
		result = arrayA;
	} else {
		result = arrayB;
	}
	let carry = 0,
		carryNext = 0; // 定义当前进位,以及下一个进位
	// 遍历字符串，相加
	result = result.map((value, index) => {
		let valueA = arrayA[index] ? arrayA[index] : 0;
		let valueB = arrayB[index] ? arrayB[index] : 0;
		carry = carryNext;
		carryNext = hasCarry([valueA, valueB, carry], 2) ? 1 : 0; // 是否进位
		return valueA ^ valueB ^ carry; // 异或得到result当前下标值
	});
	// 最高位进位加一位
	if (carryNext) {
		result.push(1);
	}
	return result.reverse().join("");
}
function hasCarry(numbers, base) {
	return (
		numbers.reduce((total, value, index) => {
			return total + value;
		}) >= base
	);
}
function mission() {
	let stringA = "111000111";
	let stringB = "11110001";
	let res = plus({ stringA, stringB });
	console.log(res);
}
mission();
