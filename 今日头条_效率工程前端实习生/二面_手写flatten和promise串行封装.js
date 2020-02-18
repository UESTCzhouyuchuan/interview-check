/**
 * 数组扁平化flatten
 */

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
/**
 * 提供一个Promsie对象数组，实现串行化
 */
Promise.serial = function serial(promises) {
	if (Array.isArray(promises)) {
		throw TypeError("Must Be Array");
	}
	new Promise((resolve, reject) => {
		let retValues = []; // 存储结果
		let length = promises.length;
		let promise = Promise.resolve();
		for (let i = 0; i < length; i++) {
			promise = promise.then(val => {
				retValues.push(val);
				return promises[i];
			});
		}
		promise.then(() => {
			resolve(retValues);
		});
	});
};
