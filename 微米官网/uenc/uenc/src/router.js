/*
 * @Author: yaoyuting
 * @Date: 2019-08-30 02:02:10
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-11 17:39:58
 * @Descripttion: 
 */
import Vue from 'vue';
import Router from 'vue-router';
import {
  goPAGE
} from './utils/utils';
Vue.use(Router);

let classify = goPAGE()
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
return routerPush.call(this, location).catch(error=> error)}

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      redirect: '/' + classify+ '/Index'
    }, {
      path: '/pc',
      name: 'home',
      component: () => import('./views/pc/Home'),
      children:[
        {
          path: '/pc/Index',
          name: 'Index',
          component: () => import('./views/pc/Index'),
        }, {
          path: '/pc/CoreMembersDetails',
          name: 'CoreMembersDetails',
          component: () => import('./views/pc/CoreMembersDetails'),
        }, {
          path: '/pc/Blog',
          name: 'Blog',
          component: () => import('./views/pc/Blog'),
        }, {
          path: '/pc/Blog/Details',
          name: 'BlogDetails',
          component: () => import('./views/pc/blog/BlogDetails'),
        }, {
          path: '/pc/Fastoken',
          name: 'Fastoken',
          component: () => import('./views/pc/Fastoken'),
        }, {
          path: '/pc/Technology',
          name: 'Technology',
          component: () => import('./views/pc/Technology'),
        }, {
          path: '/pc/Task/Details',
          name: 'TaskDetails',
          component: () => import('./views/pc/Task/TaskDetails'),
        }, {
          path: '/pc/Devdocument',
          name: 'Devdocument',
          component: () => import('./views/pc/Devdocument'),
        },{
          path: '/pc/Developers',
          name: 'Developers',
          component: () => import('./views/pc/Developers'),
        }, {
          path: '/pc/community/Proposal',
          name: 'Proposal',
          component: () => import('./views/pc/Proposal'),
        }, {
          path: '/pc/community/Vote',
          name: 'Vote',
          component: () => import('./views/pc/Vote'),
        },{
          path: '/pc/community/Proposal/Add',
          name: 'AddProposal',
          component: () => import('./views/pc/Proposal/AddProposal'),
        }, {
          path: '/pc/community/Proposal/Details',
          name: 'ProposalDetails',
          component: () => import('./views/pc/Proposal/Details'),
        }
      ]
    }, {
      path: '/m',
      name: 'home',
      component: () => import('./views/m/Home'),
      children:[
        {
          path: '/m/Index',
          name: 'Index',
          component: () => import('./views/m/Index'),
        }, {
          path: '/m/CoreMembersDetails',
          name: 'CoreMembersDetails',
          component: () => import('./views/m/CoreMembersDetails'),
        }, {
          path: '/m/Blog',
          name: 'Blog',
          component: () => import('./views/m/Blog'),
        }, {
          path: '/m/Blog/Details',
          name: 'BlogDetails',
          component: () => import('./views/m/blog/BlogDetails'),
        }, {
          path: '/m/Fastoken',
          name: 'Fastoken',
          component: () => import('./views/m/Fastoken'),
        }, {
          path: '/m/Technology',
          name: 'Technology',
          component: () => import('./views/m/Technology'),
        }, {
          path: '/m/Task/Details',
          name: 'TaskDetails',
          component: () => import('./views/m/Task/TaskDetails'),
        }, {
          path: '/m/Developers',
          name: 'Developers',
          component: () => import('./views/m/Developers'),
        }, {
          path: '/m/Devdocument',
          name: 'Devdocument',
          component: () => import('./views/m/Devdocument'),
        },{
          path: '/m/community/Proposal',
          name: 'Proposal',
          component: () => import('./views/m/Proposal'),
        }, {
          path: '/m/community/Vote',
          name: 'Vote',
          component: () => import('./views/m/Vote'),
        },{
          path: '/m/community/Proposal/Add',
          name: 'AddProposal',
          component: () => import('./views/m/Proposal/AddProposal'),
        }, {
          path: '/m/community/Proposal/Details',
          name: 'ProposalDetails',
          component: () => import('./views/m/Proposal/Details'),
        }
      ]
    }
  ]
});

