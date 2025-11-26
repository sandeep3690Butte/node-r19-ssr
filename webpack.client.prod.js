const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');


module.exports = merge(common, {
    name: 'client',
    target: 'web',
    mode: 'production',
    entry: { main: path.resolve(__dirname, '/client/index.jsx') },
    output: {
        path: path.resolve(__dirname, 'dist/client'),
        filename: '[name].[contenthash:8].js',
        chunkFilename: '[name].[contenthash:8].chunk.js',
        publicPath: '/static/'
    },
        module: {
            rules: [
                {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
                }
            ]
        },
        optimization: {
            splitChunks: { chunks: 'all' },
            runtimeChunk: { name: 'runtime' }
        },
    plugins: [
        new MiniCssExtractPlugin({ filename: '[name].[contenthash:8].css' }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.template.html'),
            filename: 'index.html',
            inject: false
        }),
        new LoadablePlugin()
    ]
});