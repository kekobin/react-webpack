const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = require('./config');
const common = require('./webpack.common.js');

//使用path.posix统一路径
function assetsPath(_path) {
    return path.posix.join('static', _path)
}

//使用NamedChunksPlugin
const seen = new Set();
const nameLength = 4;

const webpackConfig = merge(common, {
    mode: 'production',
    // devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: assetsPath('js/[name].[chunkhash:10].js?kwcache=1'),
        // chunkFilename: assetsPath('js/[id].[chunkhash:10].js?kwcache=1'),
        publicPath: process.env.NODE_ENV == 'development' ? config.dev.assetsPubPath : config.build.assetsPubPath
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new OptimizeCSSAssetsPlugin({}),
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            cache: true,
            parallel: true
        }),
        new HtmlWebpackPlugin({
            title: config.title,
            filename: 'index.html',
            template: './template/index.html',
            viewname: config.pageviewName,
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            chunksSortMode: 'dependency',
            chunks: ['app', 'vendors', 'runtime', 'commons']
        }),
        new HtmlWebpackPlugin({
            title: config.title,
            filename: 'main.html',
            template: './template/main.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency',
            chunks: ['mapp', 'vendors', 'runtime', 'commons']
        }),
        new InlineManifestWebpackPlugin('runtime'),
        //使用 HashedModuleIdsPlugin 固定 moduleId
        new webpack.HashedModuleIdsPlugin(),
        //使用 NamedChunkPlugin结合自定义 nameResolver 来固定 chunkId
        new webpack.NamedChunksPlugin(chunk => {
            if (chunk.name) {
                return chunk.name;
            }
            const modules = Array.from(chunk.modulesIterable);
            if (modules.length > 1) {
                const hash = require("hash-sum");
                const joinedHash = hash(modules.map(m => m.id).join("_"));
                let len = nameLength;
                while (seen.has(joinedHash.substr(0, len))) len++;
                seen.add(joinedHash.substr(0, len));
                return `chunk-${joinedHash.substr(0, len)}`;
            } else {
                return modules[0].id;
            }
        }),
    ],
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
                commons: {
                    name: 'commons', // 提取出来的文件命名
                    // name： ‘common/common’ //  即先生成common文件夹
                    chunks: 'initial', // initial表示提取入口文件的公共css及js部分
                    // chunks: 'all' // 提取所有文件的公共部分
                    // test： '/\.css$/'  // 只提取公共css ，命名可改styles 
                    minChunks: 2, // 表示提取公共部分最少的文件数
                    minSize: 0 // 表示提取公共部分最小的大小 
                    // 如果发现页面中未引用公共文件，加上enforce: true
                }
            }
        }
    }
});

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig;