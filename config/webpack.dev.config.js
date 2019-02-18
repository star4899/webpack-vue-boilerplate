const path = require("path");

// webpack plugin 사용을 위한 의존성
const webpack = require("webpack");

// html 번들 파일 생성
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	output : {
		// 저장시마다 변경되는 해시값을 적용
		filename : "js/[name][hash].js"
	},
	plugins : [
		// 변경된 파일이 있을 경우 페이지 자동 리로드
		new webpack.HotModuleReplacementPlugin(),
		// 프로젝트에 상태(변수)값 전달
		new webpack.DefinePlugin({
			"process.env" : {
				NODE_ENV : '"development"'
			}
		}),
		// 번들용 html 설정
		new HtmlWebpackPlugin({
			template : "./index.html",
			filename : "./index.html",
			inject : true
		})
	],
	// webpack dev server 설정
	devServer : {
		contentBase : path.resolve(__dirname + "/dist"),
		compress : true,
		index : "./index.html"
	}
};