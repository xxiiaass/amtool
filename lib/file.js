'use strict';

const fs = require('fs');
const path = require('path');
const unam = require('./command');

class File {
	constructor(filepath){
		var absolutePath;
		if( !path.isAbsolute(filepath) )
			absolutePath = path.join(process.cwd(), filepath);
		else
			absolutePath = filepath;
		this.absolutePath = absolutePath;
	}

	picHas(){
		var obj = unam.unam(this.absolutePath);
		var tmparray = obj.content.match(/!\[.+\]\(((?!\/images\/).*?)\)/g) || [];
		var contentPicArray = tmparray.map(x=>{
			return x.match(/\((.+)\)/)[1];
		});
		var headerPicArray = obj.header.path || [];
		var allArray = Array.from([...contentPicArray, ...headerPicArray]);
		console.log(allArray);
		return allArray.map(x=>{
			if(path.isAbsolute(x))
				return [x, x];
			else
				return [path.join(path.dirname(this.absolutePath), x), x];
		})
	}
}

module.exports = File;