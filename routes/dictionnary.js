let express = require('express');
let router = express.Router();

router.get('/kanji/:query', function(req, res){
	const KANJI_TARGET = "https://api.nihongoresources.com/kanji/find/" + req.param.query;
	fetch(KANJI_TAGET)
	.then(response => response.json())
	.then(response => console.log(response));
});

module.exports = router;