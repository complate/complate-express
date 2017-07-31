"use strict";

const WritableStream = require("./writable_stream");

module.exports = (bundlePath, { cache = false } = {}) => {
	return (req, res, next) => {
		const renderer = resolveBundle(res.app, bundlePath, { cache });

		res.complate = (tag, params) => {
			let stream = new WritableStream(res);
			renderer(stream, tag, params);
			res.end();
		};

		next();
	};
};

function resolveBundle(app, bundlePath, { cache = false } = {}) {
	// by default the require cache is disabled for dev environment,
	// so the given renderer is updated on each request.
	// This enables a watch/compile setup for re-creating the renderer
	// and its components.
	//
	// Set `cache` to true, if you want to cache the renderer also in dev-mode.
	if(!cache && !app.enabled("view cache")) {
		delete require.cache[bundlePath];
	}

	return require(bundlePath);
}
