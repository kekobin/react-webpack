const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");
const glob = require("glob-all");

const config = require('./config')
const devMode = process.env.NODE_ENV !== 'production'

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

//使用path.posix统一路径
function assetsPath(_path) {
	return path.posix.join('static', _path)
}

module.exports = {
	// context: path.resolve(__dirname, './'),
	entry: {
		app: './src/app.js',
		mapp: './src/mapp.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		publicPath: process.env.NODE_ENV == 'development' ? config.dev.assetsPubPath : config.build.assetsPubPath
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json'],
		modules: ["src", "node_modules"],
		alias: {
			'@': resolve('src'),
			'src': resolve('src'),
			'assets': resolve('src/assets'),
			'components': resolve('src/components')
		}
	},
	module: {
		rules: [{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					cacheDirectory: true,
					presets: [
						"@babel/preset-react", 
						['@babel/preset-env', {modules: false}]
					],
					plugins: [[ "@babel/plugin-proposal-decorators", { "legacy": true } ],["@babel/plugin-proposal-class-properties",{ "loose": true }], "@babel/plugin-syntax-dynamic-import"]
				}
			},
			{
				test: /\.(css|scss)$/,
				use: [
					devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: 'postcss-loader',
						options: {
							// config: {
							//   path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
							// }
							ident: 'postcss',
							plugins: (loader) => [
								require('autoprefixer'),
								require('postcss-import')({
									root: loader.resourcePath
								}),
								require('postcss-pxtorem')({
									"rootValue": 75,
									"propList": ["*"]
								})
							]
						}
					},
					"sass-loader"
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 10000,
						name: assetsPath('img/[name].[hash:10].[ext]')
					}
				}]
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: assetsPath('fonts/[name].[hash:10].[ext]')
				}
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: devMode ? assetsPath('[name].css') : assetsPath('css/[name].[contenthash:10].css')
			// chunkFilename: devMode ? assetsPath('[id].css') : assetsPath('css/[id].[chunkhash:10].css')
		}),
		//tree shaking css, notice:the html path must correct, and PurifyCSSPlugin must behind MiniCssExtractPlugin
		//还不成熟，会把一些有用的也干掉了
		// !devMode && new PurifyCSSPlugin({
		// 	paths: glob.sync([
		// 		path.join(__dirname, "template/*.html"),
		// 		path.join(__dirname, "src/**/*.js")
		// 	])
		// })
	]
}