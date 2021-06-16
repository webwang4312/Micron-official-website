/*
 * @Author: yaoyuting
 * @Date: 2019-08-25 14:07:20
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-10 22:09:31
 * @Descripttion: 
 */
module.exports = {
	outputDir:'dist/',
	// assetsDir:"../",
	publicPath: "/",
	// 正式地址
	// http://47.75.93.221:9100
	// 测试地址http://47.98.110.210:9100
	devServer: {
		proxy: {  //配置跨域
		  '/system': {
			target: 'http://47.98.110.210:9100',  //这里后台的地址模拟的;应该填写你们真实的后台接口
			changOrigin: true,  //允许跨域
			pathRewrite: {
			  /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
				实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
			   */
			  '^/': '' 
			}
		  },
		}
	},
	lintOnSave: false
};
