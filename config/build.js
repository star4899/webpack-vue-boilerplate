// node 에서 직접 실행



const path = require("path");

// webpack plugin 사용을 위한 의존성
const webpack = require("webpack");

// 터미널 스피너 라이브러리
const ora = require("ora");
const spinner = ora({
	color : "yellow",
	text : "빌드 진행 중 입니다."
}).start();

// 터미널 스타일링 라이브러리
const chalk = require("chalk");

// webpack build config
const buildConfig = require("./config/webpack.build.config");

webpack(buildConfig, (err, state) => {
	spinner.stop();
	const result = stats.toString({
		colors : true,
		modules : false,
		children : false,
		chunks : false,
		chunkModules : false
	});
	process.stdout.write(`${result}\n\n`);
	if(stats.hasErrors()){
		console.log(chalk.red('빌드 중 에러가 발생했습니다.\n'));
		process.exit(1);
	};
	console.log('outputPath:', chalk.cyan(`${stats.compilation.compiler.outputPath}\n`));
	console.log(chalk.yellowBright('빌드가 완료되었습니다.\n'));
});