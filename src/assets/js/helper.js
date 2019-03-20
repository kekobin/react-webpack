
const Helper = (() => {
	function getURLParam(name) {
		let value = window.location.search.match(new RegExp("[?&]" + name + "=([^&]*)(&?)", "i"));
		return value ? decodeURIComponent(value[1]) : value;
	}

	function getCookie(cookieName) {
		var cookieString = document.cookie;
		var cookies = cookieString.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i];
			var start = cookie.indexOf(cookieName + '=');
			if (start == -1 || start > 1) continue;
			start += cookieName.length + 1;
			return cookie.substring(start);
		}
		return null;
	}

	class Helper {
		// 替换参数
		replaceUrlParamVal(url, paramName, replaceWith) {
			var re = eval('/(' + paramName + '=)([^&]*)/gi');
			var nUrl = url.replace(re, paramName + '=' + replaceWith);
			return nUrl;
		}
		
		formatTime(time) {
			let min = Math.floor(time / 60),
				second = time % 60;
			min = min < 10 ? ('0' + min) : min;
			second = second < 10 ? ('0' + second) : second;
			return min + ':' + second;
		}

		/**
		 * 返回时:分
		 */
		formatTimeHM(time) {
			let d = new Date(time * 1000),
				h = d.getHours(),
				m = d.getMinutes();

			h = h < 10 ? ('0' + h) : h;
			m = m < 10 ? ('0' + m) : m;

			return h + ':' + m;
		}

		formatHour(hour) {
			return hour < 10 ? ('0' + hour) : hour;
		}

		formatNum(num) {
			return String(num).replace(/\B(?=(\d{3})+$)/g, ',');
		}

		formatYMDHM(time) {
			let d = new Date(time * 1000),
				y = d.getFullYear(),
				month = d.getMonth() + 1,
				day = d.getDate(),
				h = d.getHours(),
				m = d.getMinutes();

			y = y < 10 ? ('0' + y) : y;
			month = month < 10 ? ('0' + month) : month;
			day = day < 10 ? ('0' + day) : day;
			h = h < 10 ? ('0' + h) : h;
			m = m < 10 ? ('0' + m) : m;

			return y + '年' + month + '月' + day + '日' + ' ' + h + ':' + m;
		}

		getCookie(cookieName) {
			var cookieString = document.cookie;
			var cookies = cookieString.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = cookies[i];
				var start = cookie.indexOf(cookieName + '=');
				if (start == -1 || start > 1) continue;
				start += cookieName.length + 1;
				return cookie.substring(start);
			}
			return null;
		}

		/**
		 * 打印信息
		 */
		log(tip, data, outputJSON) {
			// if (!debug) return;
			console.log('%c[DEMO-LOG-' + tip + ':]%c', this.logcss("#009100"), null, data);
		}

		/**
		 * 给log添加颜色
		 */

		logcss(color) {
			return "color:" + color + ";font-weight:900";
		}

		getPlatform() {
			var browser = {
				versions: function () {
					var u = navigator.userAgent,
						app = navigator.appVersion;
					return { //移动终端浏览器版本信息 
						trident: u.indexOf('Trident') > -1, //IE内核 
						presto: u.indexOf('Presto') > -1, //opera内核 
						webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核 
						gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核 
						mobile: !!u.match(/AppleWebKit.+Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端 
						ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 
						android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器 
						iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQ HD浏览器 
						iPad: u.indexOf('iPad') > -1, //是否iPad 
						webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部 
					};
				}()
			};

			return browser.versions.android ? 'android' : 'ios';
		}


		isIOS() {
			var browser = {
				versions: function () {
					var u = navigator.userAgent,
						app = navigator.appVersion;
					return { //移动终端浏览器版本信息 
						trident: u.indexOf('Trident') > -1, //IE内核 
						presto: u.indexOf('Presto') > -1, //opera内核 
						webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核 
						gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核 
						mobile: !!u.match(/AppleWebKit.+Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端 
						ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 
						android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器 
						iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQ HD浏览器 
						iPad: u.indexOf('iPad') > -1, //是否iPad 
						webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部 
					};
				}()
			};

			return !!browser.versions.ios;
		}

		formatSec(seconds) {
			var hour = parseInt(seconds / 60 / 60),
				m = parseInt(seconds / 60 % 60),
				s = parseInt(seconds % 60);
			var target = hour === 0 ? [m, s] : [hour, m, s];

			return target.join(":")
				.replace(/\b(\d)\b/g, "0$1");
		}

		numberFormat(value) {
			if (value < 10) {
				return "0" + value.toString();
			} else {
				return value.toString();
			}
		}

		createUUID() {
			var dt = new Date().getTime();
			var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				var r = (dt + Math.random() * 16) % 16 | 0;
				dt = Math.floor(dt / 16);
				return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
			});
			return uuid;
		}
	}

	return Helper;
})();

export default new Helper