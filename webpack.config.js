const path = require('path');

const clientConfig = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'venus-fetch.web.js',
        library: 'vFetch',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    module: {
        rules: [{
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: [/node_modules/],
            },
            {
                test: /\.es6$/,
                loaders: ['babel-loader'],
            },
        ],
    },
}

const serverConfig = {
    mode: 'production',
    target: 'node',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'venus-fetch.node.js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
}


module.exports = [clientConfig, serverConfig]