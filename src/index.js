"use strict";

const WritableStream = require("./writable_stream");

module.exports = renderer => {
	return (req, res, next) => {
		res.render = (tag, params) => {
			let stream = new WritableStream(res);
			renderer(stream, tag, params);
			res.end();
		};

		next();
	};
};
