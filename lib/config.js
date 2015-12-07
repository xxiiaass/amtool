var fs = require('fs');

var configs;
try{
	configs = JSON.parse(fs.readFileSync('../.config.json').toString('utf8'))
}catch(e){
	console.log('.config.json is err, please check it');
	exit(0);
}

module.exports = configs;