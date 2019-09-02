const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const isProduction = typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';
const devtool = isProduction ? false : 'inline-source-map';
module.exports = {
    entry: [
        'webpack/hot/poll?100',
        './src/main.ts',
    ],
    optimization: {
        minimize: false,
    },
    target: 'node',
    mode,
    devtool,
    externals: [
        nodeExternals({
            whitelist: ['webpack/hot/poll?100'],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                  transpileOnly: true
                },
                exclude: /node_modules/,
              }
]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
        new ForkTsCheckerWebpackPlugin({
            tslint: true
        }),
        new webpack.DefinePlugin(
            { 
                CONFIG: JSON.stringify(require("config")) 
            }
        ),
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server.js',
    },
};