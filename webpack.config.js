var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
    entry: {
        application: './src/Application.ts'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: './src/tsconfig.json'
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpg|mp3)$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MinifyPlugin()
    ]
}
