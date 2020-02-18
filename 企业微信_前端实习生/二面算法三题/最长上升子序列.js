// 求出最长上升序列

function longest(arr) {
	let arr_ = arr.map((value, index) => ({
		const_index: index,
		index: index,
		longest_value: 1,
	}));

	let arr_len = arr.length;
	for (let i = 0; i < arr_len; i++) {
		for (let j = 0; j < i; j++) {
			// 严格上升，大于
			if (
				arr[i] > arr[j] &&
				arr_[i].longest_value < arr_[j].longest_value + 1
			) {
				arr_[i].longest_value = arr_[j].longest_value + 1;
				arr_[i].index = arr_[j].index;
			}
		}
	}
	// 倒叙
	return arr_.sort((a, b) => b.longest_value - a.longest_value)[0].index;
}
let arr = [4, 6, 2, 4, 5, 7];
console.log(longest(arr));
