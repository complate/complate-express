// eslint-disable-next-line no-unused-vars
import renderer, { registerMacro, createElement } from "complate-stream";

registerMacro("site-index", ({ title }) => {
	return <default-layout title={title}>
		<h1>{title}</h1>
	</default-layout>;
});

export default renderer();
