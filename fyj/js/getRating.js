document.addEventListener("DOMContentLoaded", function(event) {
	function _getJson(url, callback) {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.responseType = 'json';
		xhr.onload = function () {
			let status = xhr.status;
			if (status === 200) {
				callback(null, xhr.response);
			} else {
				callback(status, xhr.response);
			}
		};
		xhr.send();
	}

	function round(value, precision) {
		var multiplier = Math.pow(10, precision || 0);
		return Math.round(value * multiplier) / multiplier;
	}

	function declOfNum(number, titles) {
		cases = [2, 0, 1, 1, 1, 2];
		return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
	}

	if (!document.querySelector("#getRatingFromEddu")) {
		throw new Error('error in rest api query: no div with id - getRatingFromEddu');
	}

	document.querySelectorAll("#getRatingFromEddu").forEach(item => {
		let dataId = parseInt(item.dataset.id);
		if (!dataId) {
			console.log('error in rest api query: no div with id - getRatingFromEddu');
			return false;
		}

		_getJson('https://eddu.pro/wp-json/test/v2/get_rating?id=' + dataId, (err, data) => {

			if ((err !== null) || (data == false)) {
				console.log('error in rest api query: no data at all');
				return false;
			}
			if (!data['rating']) {
				console.log('error in rest api query: no rating');
				return false;
			}

			let rating = data['rating'];
			let users = data['users'];
			let url = data['url'];

			if (!users) {
				users = 0;
			}

			let starPassive = '<svg class="gr__star" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#e0dadf" d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>';
			let starActive = '<svg class="gr__star" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ff8a00" d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>';
			let starHalf = '<svg class="gr__star" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><defs><clipPath id="cut"><rect x="-7" y="-1" width="20" height="30" /></clipPath></defs><path fill="#ff8a00" d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" clip-path="url(#cut)" /><path stroke="#ff8a00" fill="transparent" d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>';
			let ratingRound = round(rating, 1);


			let style = "<style>";
			style += ".gr__wrap{display:inline-flex;align-items:center;margin:10px 0;background:#fff;border-radius:10px;padding:10px;text-decoration:none;color:inherit;border: 2px solid #000;}";
			style += ".gr__big-rating--wrapper{border-right: 0.1em solid #000;padding-right: 10px;margin-right: 10px;}";
			style += ".gr__big-rating--wrapper .logo{width:135px;}";
			style += ".gr__line{display:flex;align-items:center;margin:0 0 5px;justify-content: flex-end;margin-top: -5px;}";
			style += ".gr__usess{display:flex;margin:0 0 5px;font-size:14px;}";
			style += ".gr__site{font-size:14px;}"
			style += ".gr__api-big{color:#000;font-size:24px;font-weight:700;}";
			style += ".gr__api-small{color:#878787;font-size:13px;}";
			style += ".gr__api-reviews{display:flex;flex-direction:column;margin:0 0 5px;color:#000;text-align:center;font-weight:500}";
			style += ".gr__big-rating{margin:0 0 5px;text-decoration:none;}";
			style += ".gr__star{margin:0 1px 0 0;}";
			style += "</style>";


			let html = '<div class="gr__big-rating--wrapper">';
					html += '<svg class="logo" id="Слой_1" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175 42.5"><defs><style>.cls-1{fill:#7854f7;}</style></defs><path class="cls-1" d="M15.86,7.13a6.32,6.32,0,0,1,6.26,0l15.19,8.73a1.09,1.09,0,0,1,.39.38,1.05,1.05,0,0,1,0,1.05,1.09,1.09,0,0,1-.39.38L31.55,21v9.4a.94.94,0,0,1-.07.4,1.13,1.13,0,0,1-.23.34h0l-.05.05-.17.15c-.15.13-.36.31-.63.52A16.16,16.16,0,0,1,28,33.39a18.83,18.83,0,0,1-9,2.22,18.83,18.83,0,0,1-9-2.22A16.16,16.16,0,0,1,7.6,31.86c-.28-.21-.54-.44-.8-.67a1.07,1.07,0,0,1-.27-.37,1.14,1.14,0,0,1-.11-.44V21L2.23,18.57v9.71a1,1,0,0,1-1,1A1,1,0,0,1,.45,29a1,1,0,0,1-.31-.74V16.76a1,1,0,0,1,.15-.53,1,1,0,0,1,.39-.39ZM22.12,26.4a6.32,6.32,0,0,1-6.26,0L8.52,22.18v7.73A15,15,0,0,0,11,31.55a17.29,17.29,0,0,0,16,0,14.63,14.63,0,0,0,2.46-1.64V22.18l-7.34,4.21ZM21.07,9A4.11,4.11,0,0,0,19,8.39,4.17,4.17,0,0,0,16.9,9L3.29,16.76,16.9,24.58a4.28,4.28,0,0,0,2.09.56,4.21,4.21,0,0,0,2.08-.56l13.62-7.82L21.07,9Z"/><path class="cls-1" d="M50.08,17.61v2.73h5.64v3.59H50.08v2.82H56v3.59H46.41V14H56v3.59Z"/><path class="cls-1" d="M59.11,14h6a8.2,8.2,0,0,1,3.21.63A8.07,8.07,0,0,1,71,16.38,8.21,8.21,0,0,1,72.76,19a8.11,8.11,0,0,1,0,6.41A8.39,8.39,0,0,1,71,28a8.17,8.17,0,0,1-2.64,1.73,8.26,8.26,0,0,1-3.2.63h-6Zm4.24,12.73h.95a6,6,0,0,0,1.81-.27,4.1,4.1,0,0,0,1.49-.83,3.8,3.8,0,0,0,1-1.41A5.19,5.19,0,0,0,69,22.18a4.92,4.92,0,0,0-.35-1.95,4.09,4.09,0,0,0-1-1.43,4.2,4.2,0,0,0-1.47-.89,5.64,5.64,0,0,0-1.87-.3h-1Z"/><path class="cls-1" d="M75.9,14h6a8.2,8.2,0,0,1,3.21.63,8.07,8.07,0,0,1,2.63,1.73A8.21,8.21,0,0,1,89.55,19a8.11,8.11,0,0,1,0,6.41A8.39,8.39,0,0,1,87.76,28a8.17,8.17,0,0,1-2.64,1.73,8.26,8.26,0,0,1-3.2.63h-6Zm4.24,12.73h1a6,6,0,0,0,1.81-.27,4.1,4.1,0,0,0,1.49-.83,3.8,3.8,0,0,0,1-1.41,5.19,5.19,0,0,0,.38-2.06,4.92,4.92,0,0,0-.35-1.95,4.09,4.09,0,0,0-1-1.43A4.2,4.2,0,0,0,83,17.91a5.64,5.64,0,0,0-1.87-.3h-1Z"/><path class="cls-1" d="M106.85,14V23.2c0,.52,0,1,0,1.56a9.31,9.31,0,0,1-.21,1.51,6.19,6.19,0,0,1-.51,1.42,5.08,5.08,0,0,1-1,1.27,5.37,5.37,0,0,1-1.16.84,6.89,6.89,0,0,1-1.34.56,7.79,7.79,0,0,1-1.45.31,10.71,10.71,0,0,1-2.92,0,7.79,7.79,0,0,1-1.45-.31,6.89,6.89,0,0,1-1.34-.56,5.11,5.11,0,0,1-2.12-2.11,5.72,5.72,0,0,1-.5-1.42,9.31,9.31,0,0,1-.21-1.51c0-.52,0-1,0-1.56V14h4.24v8.59q0,.81.06,1.59a4.48,4.48,0,0,0,.35,1.43,2.36,2.36,0,0,0,.87,1,3.48,3.48,0,0,0,3.2,0,2.36,2.36,0,0,0,.87-1,4.48,4.48,0,0,0,.34-1.43c0-.52.07-1.05.07-1.59V14Z"/><path class="cls-1" d="M111.87,25.71a2.53,2.53,0,0,1,1,.19,2.5,2.5,0,0,1,.81.54,2.54,2.54,0,0,1,.54.82,2.49,2.49,0,0,1,.2,1,2.57,2.57,0,0,1-.2,1,2.46,2.46,0,0,1-.54.8,2.87,2.87,0,0,1-.81.54,2.53,2.53,0,0,1-2,0,2.87,2.87,0,0,1-.81-.54,2.34,2.34,0,0,1-.55-.8,2.77,2.77,0,0,1-.19-1,2.67,2.67,0,0,1,.19-1,2.42,2.42,0,0,1,.55-.82,2.5,2.5,0,0,1,1.79-.73Z"/><path d="M117,14h6.78a8.68,8.68,0,0,1,2.41.31,4.9,4.9,0,0,1,1.87,1A4.3,4.3,0,0,1,129.24,17a6.17,6.17,0,0,1,.43,2.43,5.39,5.39,0,0,1-1.49,4.22,6.29,6.29,0,0,1-4.29,1.32H121.2v5.41H117Zm4.24,7.49h1.28c.4,0,.77,0,1.13,0a3.14,3.14,0,0,0,1-.22,1.54,1.54,0,0,0,.7-.59,2.13,2.13,0,0,0,.26-1.15,2.51,2.51,0,0,0-.25-1.21,1.54,1.54,0,0,0-.66-.61,2.62,2.62,0,0,0-1-.23q-.56,0-1.17,0H121.2Z"/><path d="M154.76,13.48a9.55,9.55,0,0,1,3.39.61A9.1,9.1,0,0,1,161,15.83a8.36,8.36,0,0,1,2,2.66,7.66,7.66,0,0,1,.75,3.39,9.46,9.46,0,0,1-.67,3.63,8.58,8.58,0,0,1-1.88,2.85,8.38,8.38,0,0,1-2.85,1.86,10.31,10.31,0,0,1-7.26,0,8.38,8.38,0,0,1-2.85-1.86,8.58,8.58,0,0,1-1.88-2.85,9.65,9.65,0,0,1-.67-3.63,7.66,7.66,0,0,1,.75-3.39,8.51,8.51,0,0,1,2-2.66,9.1,9.1,0,0,1,2.89-1.74A9.55,9.55,0,0,1,154.76,13.48Zm0,4.11A4.42,4.42,0,0,0,153,18a4.71,4.71,0,0,0-1.47.95,4.62,4.62,0,0,0-1,1.37,3.7,3.7,0,0,0-.37,1.63,5,5,0,0,0,.37,2,4.86,4.86,0,0,0,1,1.53,4.57,4.57,0,0,0,1.47,1,4.27,4.27,0,0,0,1.78.37,4.32,4.32,0,0,0,1.79-.37,4.64,4.64,0,0,0,1.46-1,4.69,4.69,0,0,0,1-1.53,5,5,0,0,0,.37-2,3.7,3.7,0,0,0-.37-1.63,4.45,4.45,0,0,0-1-1.37,4.78,4.78,0,0,0-1.46-.95A4.47,4.47,0,0,0,154.76,17.59Z"/><path d="M140.69,23.88a4.9,4.9,0,0,0,2.7-1.81,4.83,4.83,0,0,0,.93-2.91,5.13,5.13,0,0,0-.68-2.61,4.58,4.58,0,0,0-2-1.86,7.3,7.3,0,0,0-3.28-.67h-6.68V30.35h4V24.18h.95l3.4,6.17h4.49Zm-1-3.05a2.19,2.19,0,0,1-1.63.54h-2.46V17.32h2.46a2.19,2.19,0,0,1,1.63.54,1.88,1.88,0,0,1,.56,1.46A2,2,0,0,1,139.71,20.83Z"/></svg>';
					
					html += '<div class="gr__line">';
						for (let i = 1; i < 6; i++) {
							if (i <= ratingRound) {
								html += starActive;
							}
							if (i > ratingRound) {
								if (i - 0.5 <= ratingRound) {
									html += starHalf;
								} else {
									html += starPassive;
								}
							}
						}		
					html += "</div>";			
				html += "</div>";
				html += '<div class="gr__api-big">' + ratingRound + '</div>';
			html += "</div>";

			item.innerHTML = style + "<a href='" + url + "' class='gr__wrap'>" + html + "</a>";
		});
	});
});
