"use strict";

// wrapper for Node's `http.ServerResponse` to provide a complate-compliant stream API
module.exports = class WritableStream {
	constructor(httpResponse) {
		this._stream = httpResponse;
	}

	writeln(msg) {
		this.write(`${msg}\n`);
	}

	write(msg) {
		this._stream.write(msg);
	}

	flush() {
		// no-op; Node's `http.ServerResponse` auto-flushes and does not provide
		// a public API for manual flushing
		//
		// NB: unfortunately, this relinquishes control to the environment,
		//     precluding explicit flushing for domain-specific situations
	}
};
