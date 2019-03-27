"use strict"
const path = require("path");

// webpack plugin 사용을 위한 연결
const webpack = require("webpack");

// config object 를 합치기 위한 패키지
const merge = require("webpack-merge");

// vue loader plugin 패키지
const { VueLoaderPlugin } = require("vue-loader");

// css 관련 패키지
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// console 디자인
// const ora = require("ora");
// const chalk = require("chalk");

// webpack config 모음
const devConfig = require("./config/webpack.dev.config");
const buildConfig = require("./config/webpack.build.config");

module.exports = (env, option) => {
	const baseConfig = {
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
					test : /\.vue$/,
					loader : "vue-loader"
				},
				{
					test : /\.js$/,
					exclude : /node_modules/,
					use : {
						loader : "babel-loader"
					}
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
						test : /[\\/]node_modules[\\/]/,
						chunks : "all",
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
	return merge(baseConfig, option.mode === "production" ? buildConfig : devConfig);
};