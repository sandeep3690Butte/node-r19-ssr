const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const LoadablePlugin = require('@loadable/webpack-plugin');


module.exports = merge(common, {
    name: 'client',
    target: 'web',
    mode: 'development',
    entry: [
        path.resolve(__dirname, '/client/index.jsx') 
    ],
    output: {
        path: path.resolve(__dirname, 'dist/client'),
        filename: '[name].js',
        publicPath: '/static/'
    },
    plugins: [new LoadablePlugin()],
    devtool: 'source-map'
});