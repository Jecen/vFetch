const path = require('path');

const clientConfig = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/index.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'fetch.web.js',
        library: 'vFetch',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        rules: [{
                test: /\.ts$/,
                loaders: ['babel-loader', 'ts-loader'],
                exclude: [/node_modules/],
            },
            {
                test: /\.d\.ts$/,
                loaders: ['babel-loader', 'ts-loader'],
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
    entry: path.resolve(__dirname, 'src/index.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'fetch.node.js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        rules: [{
                test: /\.ts$/,
                loaders: ['babel-loader', 'ts-loader'],
                exclude: [/node_modules/],
            },
            {
                test: /\.d\.ts$/,
                loaders: ['babel-loader', 'ts-loader'],
                exclude: [/node_modules/],
            },
            {
                test: /\.es6$/,
                loaders: ['babel-loader'],
            },
        ],
    },
}


module.exports = [clientConfig, serverConfig]