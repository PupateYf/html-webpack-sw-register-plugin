### Install

```bash
$ npm install html-webpack-sw-register-plugin
```

### Usage
```js
plugins: [
    new HtmlWebpackPlugin({
        swConfig: {
            swPath: 'sw.js' // the static path of your service worker
        }
    }),
    new SWRegisterPlugin()
]
```

*Take notic of:* The static path of service worker is necessary. If you use the	relative path that may cause the service worker not be found during the registering.

The recommend ways:
```js
entry: {
    index: './app.js',
    sw: './src/somePaht/sw.js' // this will be build as dist/sw.js, and use 'sw.js' could be registered easily
},
output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js'
},
plugins: [
    new HtmlWebpackPlugin({
        swConfig: {
            swPath: 'sw.js' // the static path of your service worker
        }
    }),
    new SWRegisterPlugin()
]
```

