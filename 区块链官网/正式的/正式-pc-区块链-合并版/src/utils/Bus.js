/*
 * @Author: yaoyuting
 * @Date: 2021-04-26 07:33:35
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-04-26 07:33:35
 * @Descripttion: 
 */
import Bus from 'vue';
let install = function (Vue) {
	// 设置eventBus
	Vue.prototype.bus = new Bus();
}

export default { install };