const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');


module.exports = {
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: { maxSize: 8 * 1024 }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.svg$/i,
                oneOf: [
                    {
                        resourceQuery: /component/, // import icon.svg?component -> ReactComponent
                        use: ['@svgr/webpack']
                    },
                    {
                        type: 'asset/resource'
                    }
                ]
            }
        ]
    },
    plugins: [new CleanWebpackPlugin()]
};