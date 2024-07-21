/*
 *防抖函数
 **/
function debounce(func, delay) {
	let timerId;
	return function() {
		const context = this;
		const args = arguments;

		clearTimeout(timerId);
		timerId = setTimeout(function() {
			func.apply(context, args);
		}, delay);
	};
}

/*
 *邮箱校验
 */
function validateEmail(email) {
	if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
		return false;
	} else {
		return true;
	}
}

function validatePhoneNumber(phoneNumber) {
	if (!/^1[3456789]\d{9}$/.test(phoneNumber)) {
		return false;
	} else {
		return true;
	}
}

module.exports = {
	debounce,
	validateEmail,
	validatePhoneNumber
}