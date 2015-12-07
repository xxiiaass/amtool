'use strict';

let path = require('path');
let Blog = require('./blog');

class AmFactory{
	generateAm( fileName ){
		let fileExtName = path.extname(fileName);
		let dstobj;
		switch( fileExtName ){
			case '.amblog':
				dstobj = new Blog(fileName);
				break;
/*			case '.ampic':
				var dstobj = new Pic(fileName);
				break;*/
			default:
				throw('file extname err !');
		}
		return dstobj;
	}
}

module.exports = new AmFactory();