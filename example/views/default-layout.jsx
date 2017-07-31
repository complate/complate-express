// eslint-disable-next-line no-unused-vars
import { registerMacro, createElement } from "complate-stream";

registerMacro("default-layout", (...children) => {
	return <html lang="en">
		<head>
			<meta charset="UTF-8"/>
			<title>Document</title>
		</head>
		<body>
			{children}
		</body>
	</html>;
});
