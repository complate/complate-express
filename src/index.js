"use strict";

let WritableStream = require("./writable_stream");

module.exports = class Renderer {
	constructor(bundlePath) {
		this.bundlePath = bundlePath;
		this.reload();
	}

	render(response, tag, params) {
		// TODO: `response.status(200);`?
		let stream = new WritableStream(response);
		this._render(stream, tag, params);
		response.end();
	}

	reload() {
		this._render = require(this.bundlePath);
	}
};
