"use strict"
const path = require("path");

// config object 를 합치기 위한 패키지
const merge = require("webpack-merge");

module.exports = {
	mode : option.mode,
	entry : {
		app : ["@babel/polyfill", "./src/index.js"]
	},
	output : {
		path : path.resolve(__dirname + "/dist")
	},
	module : {
		rules : [
			{
				test : /\.js$/,
				exclude : /node_modules/,
				use : {
					loader : "babel-loader"
				}
			},
			{
				test : /\.vue$/,
				loader : "vue-loader"
			},
			{
				test : /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader",
					"sass-loader"
				]
			},
			{
				test : /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader : "url-loader",
				options: {
					name : "images/[name].[ext]"
				}
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename: "style/[name][hash].css"
		}),
		new OptimizeCssAssetsPlugin({
			cssProcessorOptions : {
				discardComments : {
					removeAll : true
				}
			}
		})
	],
	optimization: {
		splitChunks : {
			cacheGroups : {
				vendor : {
					test : /\.js$/,
					chunks : "initial",
					name : "vendor",
					enforce : true,
				},
				styles : {
					test : /\.css$/,
					chunks : "all",
					enforce : true
				}
			}
		}
	},
	resolve: {
		alias: {
			"vue$": "vue/dist/vue.esm.js",
			"@" : path.resolve(__dirname + "/src")
		},
		extensions: ["*", ".js", ".vue", ".json"]
	}
};