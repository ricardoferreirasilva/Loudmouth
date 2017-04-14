const path = require('path')

var ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, '.'),
        filename: 'bundle.js'
    },
    target: 'electron',
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test: /\.module\.(css|scss)$/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS
                    query: {
                      modules: true,
                      localIdentName: '[name]__[local]___[hash:base64:5]'
                    }
                }, {
                    loader: 'sass-loader' // compiles Sass to CSS
                }]
            },
            {
                test: /^((?!\.module).)*(css|scss)$/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS
                }, {
                    loader: 'sass-loader' // compiles Sass to CSS
                }]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                query: {}
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css')
    ]
}

module.exports = config
