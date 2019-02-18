// html 번들 파일 생성
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	output : {
		// 파일 변경시 마다 변경되는 해시값을 적용
		filename : "js/[name][chunkhash].js"
	},
	plugins : [
		// // 번들용 html 설정
		new HtmlWebpackPlugin({
			template : "./index.html",
			filename : "./index.html",
			inject : true
		})
	]
};