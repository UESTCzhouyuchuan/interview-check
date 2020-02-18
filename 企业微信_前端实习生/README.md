## 企业微信
题主面试的部门在成都，岗位是前端实习生。

企业微信面试流程：
- 一面视频面，筛选，前端知识问的不多，算法和项目为主。
- 二面电话面，先写三道算法题(45分钟，在腾讯在线文档)，然后一个小组的人轮流问问题，越往后压力越大。而且询问了实习时间，啥时候能去。
- 三面视频面，算法和智力题，夹杂点网络协议TLS。
- 最后一面就是通知电话，我面试的是成都部门，打电话的是深圳总部，问你愿不愿意接受offer。(由于字节先打的电话而且待遇好，就拒了)

## 算法介绍
1. 一面算法题，二进制字符串加法运算。举例：
```js
"11"+"11" = "110"
```

2. 二面算法题。
     1. 最长上升子序列问题，输出该子序列的首节点的下标，不懂百度查之。
     2. 进制转化问题
		>问题：A=0,B=2,C=3,...Z=25,BA=26,...,BZ=51..,给出字符串，转化为10进制数。
     3. 二叉树的非递归遍历求第n大的数。
		> 问题：一个二叉排序树，也就是中序遍历之后是升序的二叉树，求其倒数第n大的节点值。
		> 思路：利用非递归遍历的前序遍历，但是先遍右儿子再遍历左儿子，最先出栈的为最右节点，那第n个出栈的为第n大。

3. 三面是字符串相乘。举例：
```js
"12"+"12" = "144"
```
## 一面算法升级版介绍
在满足算法题的情景要求之后，我想到了其升级版本，主要在两个方面。一个是增加了减法运算，考虑减法。另一个是不知局限为二进制，扩展为n进制问题，把魔法常量2用一个变量`base`表示。

1. 开始考虑字符串正负号，考虑减法运算
```javascript
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
2. 扩展为n进制问题
```javascript
// 构造函数增加一个base参数
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
```javascript
// 在进行运算时，使用变量base
result = result.map((value, index) => {
		let valueA = arrayA[index] ? arrayA[index] : 0; // 可能当前超出数组范围，做判断
		let valueB = arrayB[index] ? arrayB[index] : 0;
		carry = carryNext;
		carryNext = this.hasCarry([valueA, valueB, carry], this.base) ? 1 : 0; // 是否进位
		return (valueA + valueB + carry) % this.base; // 异或得到result当前下标值
	});
```