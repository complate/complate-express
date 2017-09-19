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
		let renderView = require(bundlePath);

		res.complate = function(view, fragment, params) {
			let stream = new WritableStream(this);
			renderView(view, params, stream, fragment, _ => {
				this.end();
			});
		};

		next();
	};
};
