const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		hot: true,
		compress: true,
		host: '172.28.25.10',
		port: '8080',
		open: true,
		publicPath: '/'
    },
    plugins: [
		new HtmlWebpackPlugin({
			title: config.title,
			filename: 'index.html',
			template: './template/index.html',
			chunks: ['app']
		}),
		new HtmlWebpackPlugin({
			title: config.title,
			filename: 'main.html',
			template: './template/main.html',
			chunks: ['mapp']
        })
	]
})