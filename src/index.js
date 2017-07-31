"use strict";

const WritableStream = require("./writable_stream");

module.exports = bundlePath => {
	return (req, res, next) => {
		const renderer = resolveBundle(res.app, bundlePath);

		res.complate = (tag, params) => {
			let stream = new WritableStream(res);
			renderer(stream, tag, params);
			res.end();
		};

		next();
	};
};

function resolveBundle(app, bundlePath) {
	// similar to template caching in other express template engines,
	// we rely on the `view cache` property to decide whether to reload
	// the given bundle or not.
	if(!app.enabled("view cache")) {
		delete require.cache[bundlePath];
	}

	return require(bundlePath);
}
