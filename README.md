# complate-express

[Express](http://expressjs.com) adaptor for [complate](https://complate)


Getting Started
---------------

Install complate-express in your Express application:

```
$ npm install complate-express
```

After registering complate's middleware, use `Response#complate` for rendering:

```javascript
let express = require("express");
let complate = require("complate-express");

let app = express();
// register complate middleware
app.use(complate("/path/to/views.js")));

app.get("/", (req, res) => {
    res.complate("MyView", { title: "Hello World" });
});
```

Views are typically generated from JSX modules:

```jsx
import { createElement } from "complate-stream";

export function MyView({ title }) {
    return <article>
        <h1>{title}</h1>
        <p>lorem ipsum dolor sit amet</p>
    </article>;
}

export default (view, params, stream, fragment, callback) => {
    return renderer.renderView(view, params, stream, { fragment }, callback);
};
```

These JSX modules are then combined into a single `views.js` bundle, e.g. using
[faucet](faucet.org) - see
[complate-sample-express](https://github.com/complate/complate-sample-express)
for details.


API
---

`Request#complate(viewName, params, options)`

* `viewName` identifies the view within the bundle
* `params` is an object passed to the respective view macro
* `options` is an optional object with the following members:
    * `fragment`, if `true`, indicates that an HTML fragment (omitting doctype
      and layout)
    * `statusCode` sets the HTTP status code (defaults to `200`)
    * `contentType` sets the corresponding HTTP response header (defaults to
      `"text/html"`)

If Express's view cache is disabled, the bundle will be reloaded for each
requests (useful for development).
