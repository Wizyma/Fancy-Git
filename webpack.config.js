const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./client/index.jsx",
    output: {
        filename: "index.bundle.js",
        path: __dirname + "/dist-client"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        extensions: ['.js', '.jsx'],
    },

    // Loaders configuration
    // Tells webpack to use 'babel-loader' for .js and .jsx file
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            },
        ],
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(path.resolve(__dirname, 'client/public'), 'index.html')
        })
    ],
};