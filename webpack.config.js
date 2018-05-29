const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = [{
    output: {
        filename: 'app.js',
        path: __dirname + '/public/creador-de-logos/dist'
    },
    entry: './public/creador-de-logos/index.js',
    mode: 'production',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    beautify: false,
                    compress: false,
                    comments: false,
                    mangle: false
                }
            })
        ]
    }
}, {
    output: {
        filename: 'app.js',
        path: __dirname + '/public/landing/dist'
    },
    entry: './public/landing/index.js',
    mode: 'production',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    beautify: false,
                    compress: false,
                    comments: false,
                    mangle: false
                }
            })
        ]
    }
}]