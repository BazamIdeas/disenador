const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = [{
    output: {
        filename: 'app.js',
        path: __dirname + '/public/creador-de-logos/built'
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
        path: __dirname + '/public/landing/built'
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
}, {
    output: {
        filename: 'app.js',
        path: __dirname + '/public/administrador/built'
    },
    entry: './public/administrador/index.js',
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
        path: __dirname + '/public/creador-de-logos/built'
    },
    entry: './public/creador-de-logos/index.js',
    mode: 'development',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    minimize: false,
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
        path: __dirname + '/public/landing/built'
    },
    entry: './public/landing/index.js',
    mode: 'development',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    minimize: false,
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
        path: __dirname + '/public/administrador/built'
    },
    entry: './public/administrador/index.js',
    mode: 'development',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    minimize: false,
                    beautify: false,
                    compress: false,
                    comments: false,
                    mangle: false
                }
            })
        ]
    }
}]