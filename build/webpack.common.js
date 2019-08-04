const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const webpackMerge = require('webpack-merge');
const webpackBase = require('./webpack.base');

const isProd = process.env.NODE_ENV === 'production';

module.exports = webpackMerge(webpackBase, {
    mode: 'production',
    optimization: {
        minimizer: [
            new TerserPlugin({
                test: /\.jsx?$/,
                exclude: 'node_modules',
            }),
        ],
    },
    entry: {
        site: path.join(__dirname, '../src/components/index.js'),
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'SoUIReact',
        umdNamedDefine: true,
    },
});
