const wanakana = require('wanakana');

module.exports = {
	/* 
	* Converts a given kana string to romaji
	* @return The string converted to romaji
	*/
	toRomaji: function(str) {
		return wanakana.toRomaji(str);
	}
}