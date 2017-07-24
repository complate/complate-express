"use strict";

const WritableStream = require("./writable_stream");

module.exports = rendererPath => {
	return (req, res, next) => {
		const renderer = typeof rendererPath === "function" ?
			rendererPath :
			resolveRenderer(res.app, rendererPath, { cache: true });

		res.complate = (tag, params) => {
			let stream = new WritableStream(res);
			renderer(stream, tag, params);
			res.end();
		};

		next();
	};
};

function resolveRenderer(app, rendererPath, { cache } = {}) {
	// by default the require cache is disabled for dev environment,
	// so the given renderer is updated on each request.
	// This enables a watch/compile setup for re-creating the renderer
	// and its components.
	//
	// Set `cache` to true, if you want to cache the renderer also in dev-mode.
	if(!cache && !app.enabled("view cache")) {
		delete require.cache[rendererPath];
	}

	return require(rendererPath);
}
