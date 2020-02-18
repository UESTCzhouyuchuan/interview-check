## 今日头条
题主面试的部门在成都，岗位是前端实习生。

今日头条效率工程面试流程：
- 一面视频面，部门leader，部门全员`TS + React`，框架的东西问的不多，js中高级知识。
- 二面北京部门来交叉面，也是框架的东西不多，和学长聊的很来。

## 算法介绍
一面是实现js的继承，比较简单。

二面flatten数组扁平化很不难，我主要做了一下延申，简述了如何解决递归时出现的循环引用问题。解决办法是使用一个`Set`数据结构记录当前值的所有祖先，判断当前值是否和祖先绝对相等。
```js
function flatten(arr, deep, set = new Set()) {
	if (!Array.isArray(arr)) {
		throw TypeError("Must be array");
	}
	if (deep <= 1) {
		return arr;
	}
	if (set.has(arr)) {
		return arr;
	}
	set.add(arr);
	let length = arr.length;
	let ret = [];
	for (let i = 0; i < length; i++) {
		if (Array.isArray(arr[i])) {
			ret = ret.concat(flatten(arr[i], deep - 1, set));
		} else {
			ret.push(arr[i]);
		}
	}
	return ret;
}
```