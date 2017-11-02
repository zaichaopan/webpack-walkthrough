var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var pathsToClean = ['dist']
let cleanOptions = {
    root: __dirname,
    verbose: true,
    dry: false
}
var VENDOR_LIBS = ['vue'];

module.exports = {
    entry: {
        app: [
            './src/main.js',
            './src/style/style.scss',
        ],
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },

    module: {
        rules: [{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'vue-loader'
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].[hash].css'),
        new CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new ManifestPlugin()
    ]
}
