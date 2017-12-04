var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var SWRegisterPlugin = require('../')

module.exports = {
    entry: {
        index: './test.js',
        sw: './sw.js'
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            swConfig: {
                swPath: 'sw.js'
            }
        }),
        new SWRegisterPlugin()
    ]
}