'use strict';

module.exports = {
	formatDate: function (date) {
		var months  = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		var month   = months[date.getMonth() - 1];
		var ampm    = date.getHours() > 12 ? 'pm' : 'am'; 
		var hours   = String(date.getHours()).length === 1 ? '0' + date.getHours()   : date.getHours();
		var minutes = String(date.getMinutes()).length === 1 ? '0' + date.getMinutes() : date.getMinutes();

		return `${month} ${date.getDate()}, ${date.getFullYear()} | ${hours%12}:${minutes}${ampm}`
	}
}