var CommpressionPlugin = require('compression-webpack-plugin')
const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
	
	//多页面配置
	 pages: {
		index: {
		  // page 的入口
		  entry: 'src/pages/index/main.js',
		  // 模板来源
		  template: 'public/index.html',
		  // 在 dist/index.html 的输出
		  filename: 'index.html',
		  // 当使用 title 选项时，
		  // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
		  title: 'Index Page',
		  // 在这个页面中包含的块，默认情况下会包含
		  // 提取出来的通用 chunk 和 vendor chunk。
		  chunks: ['chunk-vendors', 'chunk-common', 'index']
		},
		home: {
			// page 的入口
			entry: 'src/pages/home/main.js',
			// 模板来源
			template: 'public/home.html',
			// 在 dist/index.html 的输出
			filename: 'home.html',
			// 当使用 title 选项时，
			// template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
			title: 'home Page',
			// 在这个页面中包含的块，默认情况下会包含
			// 提取出来的通用 chunk 和 vendor chunk。
			chunks: ['chunk-vendors', 'chunk-common', 'index']
		},
	 },
	 //关闭eslint
	  lintOnSave: false,
	  //服务配置
	  devServer: {
	  	clientLogLevel: 'warning',
	  	historyApiFallback: true,
	  	hot: true,
	  	compress: true,
	  	host: 'localhost',
	  	port: 8008,
	  	open: true,
	  	overlay: {
	  		warnings: false,
	  		errors: true,
	  	},
	  	proxy: null,
	  	quiet: true, // necessary for FriendlyErrorsPlugin
	  	watchOptions: {
	  		poll: true,
	  	}
	  },
		css:{
			sourceMap:false
		},
		//js sourceMap
		productionSourceMap:false,
		
		//别名
		chainWebpack: config => {
			config.resolve.alias
				.set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
		},

		//gzip压缩
		
		configureWebpack: config => {
			if(process.env.NODE_ENV==='production'){
				 return{
					 plugins:[
						 new CommpressionPlugin({
							 test:/\.js$|\.html$|\.css/,
							 threshold:10240,
							 deleteOriginalAssets: false
						 })
					 ]
				 }
			}
		},
		
		
};