"use strict";

let WritableStream = require("./writable_stream");
let path = require("path");

// generates middleware adding `#complate` rendering method to response object
module.exports = bundlePath => {
	bundlePath = path.resolve(bundlePath);

	return (req, res, next) => {
		if(!res.app.enabled("view cache")) { // ensure bundle is reloaded
			delete require.cache[bundlePath];
		}
		let render = require(bundlePath);

		res.complate = (tag, params) => {
			let stream = new WritableStream(res);
			render(stream, tag, params);
			res.end();
		};

		next();
	};
};
