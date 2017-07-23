// eslint-disable-next-line no-unused-vars
import renderer, { registerMacro, createElement } from "complate-stream";
import "./default-layout";

registerMacro("site-index", ({ title }) => {
	return <default-layout>
		<h1>{title}</h1>
	</default-layout>;
});

export default renderer();
