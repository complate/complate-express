"use strict";
const path = require("path");
const express = require("express");
const complate = require("complate-express");

const bundle = require(path.resolve(__dirname, "dist", "bundle.js"));
const app = express();

app.use(complate(bundle));

app.get("/", (req, res) => {
	return res.render("site-index", { title: "Hello World!" });
});

app.listen(5000);
