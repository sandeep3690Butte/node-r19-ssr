const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const LoadablePlugin = require('@loadable/webpack-plugin');


module.exports = merge(common, {
    name: 'server',
    target: 'node',
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: [
         path.resolve(__dirname, 'server/index.js') 
    ],
    output: {
        path: path.resolve(__dirname, 'dist/server'),
        filename: 'main.js',
        libraryTarget: 'commonjs2',
        publicPath: '/static/'
    },
    externals: [nodeExternals()],
    module: {
        rules: [
        {
        test: /\.css$/,
        use: ['css-loader'] // do not extract or inject on server
        }
        ]
    },
    plugins: [new LoadablePlugin()],
    devtool: 'source-map'
});