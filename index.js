const fs = require('fs')
const parse5 = require('parse5')
const _ = require('lodash')

let customConfig

function SWRegisterPlugin(options) {}

function apply(compiler) {
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-html-processing', function (htmlPluginData, callback) {
            // init custom config
            customConfig = htmlPluginData.plugin.options.swConfig
            if (!customConfig && _.isObject(customConfig)) {
                customConfig = {}
            }

            processSWInject(htmlPluginData.html, customConfig).then(html => {
                htmlPluginData.html = html
                callback(null, htmlPluginData)
            }).catch(err => {
                console.log(err)
            })

        })
    })
}

function processSWInject(html, config) {

    var document = parse5.parse(html, {
        locationInfo: true
    })

    return new Promise((resolve, reject) => {
        if (document.childNodes && document.childNodes.length) {
            // get position of las tag in head
            let endPosition = getHeadLastPos(document.childNodes)
            let swTemplate

            // get sw template
            fs.readFile('./default_install_sw.tmpl.js', 'utf8', (err, data) => {
                err && reject(err)
                swTemplate = new Function(`sw_path="'${config.swPath}'"; return ${data}`)()

                // process the output template
                html =
                    html.substring(0, endPosition.endOffset) +
                    `\n<script>\n${swTemplate}\n</script>\n` +
                    html.substring(endPosition.endOffset)

                resolve(html)
            })
        }
    })
}

// @return documentFrag
function getHeadLastPos(nodeList) {
    let pos = nodeList.filter(_ => _.tagName === 'html')
        .shift().childNodes
        .filter(_ => _.tagName === 'head')
        .shift().childNodes
        .pop()
        .__location
    return pos
}

Object.defineProperty(SWRegisterPlugin.prototype, 'apply', {
    value: apply,
    enumerable: false
})

module.exports = SWRegisterPlugin