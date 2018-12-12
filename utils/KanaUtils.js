const wanakana = require('wanakana');

module.exports = {
	toRomaji: function(str) {
		return wanakana.toRomaji(str);
	}
}