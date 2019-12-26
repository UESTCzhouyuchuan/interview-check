# interview-check
面试官学长们出的算法题，放在这里，文件名称格式为日期加上问题概要
# 升级部分
- 头脑风暴，满足多种情况
  ```
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
  ```
- 把魔法常量有变量表示，以二进制类推为n进制
  预处理时
  ```
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
  ```
  处理时
  ```
  result = result.map((value, index) => {
			let valueA = arrayA[index] ? arrayA[index] : 0; // 可能当前超出数组范围，做判断
			let valueB = arrayB[index] ? arrayB[index] : 0;
			carry = carryNext;
			carryNext = this.hasCarry([valueA, valueB, carry], this.base) ? 1 : 0; // 是否进位
			return (valueA + valueB + carry) % this.base; // 异或得到result当前下标值
		});
  ```