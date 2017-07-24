"use strict";
const path = require("path");
const express = require("express");
const complate = require("complate-express");

const app = express();

// just hand in the complate middleware, to register the complate
// rendering function. In dev-env the bundle is not cached, so that
// it can be updated between incoming requests.
//
// This behavior is disabled in `NODE_ENV=production` or can be disabled
// by passing in options with cache: true (default is false).
app.use(complate(path.resolve(__dirname, "dist", "bundle.js"), { cache: false }));

app.get("/", (req, res) => {
	return res.complate("site-index", { title: "Hello World!" });
});

app.listen(5000);
