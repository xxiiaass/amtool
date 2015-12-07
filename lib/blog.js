'use strict';

var http = require('http');
var querystring = require('querystring');
var configs = require('./config');
var comd = require('../lib/command');

class Blog{
	constructor(file){
		let blogData = comd.unam(file);
		this.type = 'blog';
		this.header = blogData.header;
		this.content = blogData.content;
	}

	send(){
        var contents = querystring.stringify({
            "header": JSON.stringify(this.header),
            "content":this.content
        });

        var options = {
            host: configs.servername,
            port: configs.port,
            path: configs.pushurl,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': contents.length
            }
        };

        var req = http.request(options, function(res){
            res.on('data', function(data){
                console.log(data.toString('utf8'));
            });
        });
        req.write(contents, 'utf8');
        req.end();
	}
}

module.exports = Blog;