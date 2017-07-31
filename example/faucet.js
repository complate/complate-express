const config = {
	targetDir: "dist",
	manifest: false,
	bundles: [{
		entryPoint: "./views/bundle.js",
		target: "bundle.js",
		format: "cjs",
		moduleName: "render",
		transpiler: {
			features: ["es2015", "jsx"],
			jsx: {
				"pragma": "createElement"
			}
		}
	}]
};

module.exports = {
	js: config
};
