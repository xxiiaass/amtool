var fs = require('fs');

var unam = function (file) {
	var fileconent = fs.readFileSync(file).toString('utf8');
	var parsesym = '------';
	var header = fileconent.substr(0, fileconent.indexOf(parsesym));
	var tmpstr = fileconent.substr(fileconent.indexOf(parsesym)+1);
	var content = tmpstr.substr( tmpstr.indexOf('\n') );
	var h = JSON.parse(header);
	return {"header":h, 'content':content};
}

exports.unam = unam; 