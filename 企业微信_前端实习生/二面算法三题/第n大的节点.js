function node(value) {
	this.value = value;
	this.left = null;
	this.right = null;
}
/**
 *
 * @param {node} root 根节点
 * @param {Number} n 倒数第n大
 */
function find(root, n) {
	if (root === null) return null;
	let ret = null; // 返回值节点
	let stack = [];
	let p = root;
	let count = 0; // 记录出栈的个数
	while (stack.length > 0 || p !== null) {
		while (p.right !== null) {
			stack.push(p);
			p = p.right;
		}
		if (stack.length > 0) {
			p = stack.pop();
			count++;
			if (count >= n) {
				// 找到第n大的数
				ret = p;
				break;
			}
			p = p.left;
		}
	}
	return ret;
}
