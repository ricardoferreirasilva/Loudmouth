const path = require('path')

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
                test: /\.(css|scss)$/,
                loader: 'ignore-loader'
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'ignore-loader'
            }
        ]
    }
}

module.exports = config
