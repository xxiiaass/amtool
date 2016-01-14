const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');
const config = require('./config');
const url = require('url');

var pushFile = function (pushpath, namepath) {
	var absolutePath;
	if( !path.isAbsolute(pushpath) )
		absolutePath = path.join(process.cwd(), pushpath);
	else
		absolutePath = pushpath;
	var target = url.format(config);
	var shell = `curl -F "upload=@${absolutePath};filename=${namepath};" ${target}`;
	console.log(shell);
	exec(shell, function (err, stdout, stderr) {
		if(err)
			console.log(err);
		if(stderr)
			console.log(stderr);
	});
}

exports.pushFile = pushFile;