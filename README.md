# complate-express

Server-side rendered component based template-engine for express.

This library is based on [complate-stream](https://github.com/complate/complate-stream).

## Quick Start Guide

Install complate-express to your express application

```
npm install complate-express
```

```
const express = require('express')
const complate = require('complate-express')

const app = express();

// add complate middleware
app.use(complate('PATH_TO_COMPLATE_RENDERER_BUNDLE'))


app.get('/', (req, res) => {
  // after adding the middleware, `res.complate` is available for rendering
  res.complate('my-component', { config })
})
```

## API

#### complate(rendererPath: String|Renderer, options: Object)

**@param bundle**: is either a path to renderer Module, or the required module itself.
If a path is given, the module will not be cached in if `app.enabled("view cache")` is false,
like it is in dev-mode.

**@param options**: `{ cache = false }`

Options:

- cache: forces the given bundle to be cached (otherwise `app.enabled('view cache')` kicks in)
