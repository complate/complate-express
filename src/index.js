"use strict";

const WritableStream = require("./writable_stream");

module.exports = bundle => {
	const _render = bundle;

	return (req, res, next) => {
		res.render = (tag, params) => {
			let stream = new WritableStream(res);
			_render(stream, tag, params);
			res.end();
		};

		next();
	};
};
