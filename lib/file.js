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
		var headerPicArraytmp = obj.header.path || [];
		//判断path是不是文件夹，是的话，需要读取文件夹下所有文件进行上传
		var headerPicArray = [];
		console.log(headerPicArraytmp);
		headerPicArraytmp.forEach(x=>{
			let fsusepath = path.isAbsolute(x)?x:path.join(path.dirname(this.absolutePath) , x);
			let stat = fs.statSync(fsusepath)
			if(!stat.isDirectory())
				headerPicArray.push(x);
			else{
				let paths = fs.readdirSync(fsusepath);
				for(let y of paths){
					let _stat = fs.statSync(path.join(fsusepath, y));
					if(!_stat.isDirectory())
						headerPicArray.push(path.join(x, y));
				}
			}
		})

		var allArray = Array.from([...contentPicArray, ...headerPicArray]);

		obj.header.path = allArray;
		this.transFilePath = this.absolutePath+'-tans';
		fs.writeFileSync(this.transFilePath, JSON.stringify(obj.header)+'\n--------\n'+obj.content);
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