"use strict";
const path = require("path");
const express = require("express");
const complate = require("complate-express");

const app = express();

// view cache is set by default to true in production
// app.set('view cache', true)

// just hand in the complate middleware, to register the complate
// rendering function. In dev-env the bundle is not cached, so that
// it can be updated between incoming requests.
app.use(complate(path.resolve(__dirname, "dist", "bundle.js")));

app.get("/", (req, res) => {
	return res.complate("site-index", { title: "Hello World!" });
});

app.listen(5000);
