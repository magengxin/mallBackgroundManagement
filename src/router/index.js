import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },
  // {
  //   // 登录
  //   path: '/login',
  //   meta: { title: 'login', icon: 'link' },
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'list',
  //       component: () => import('@/views/login/index'),
  //       meta: {title: '登录'}
  //     }
  //   ]
  // },
  {
    // 商品管理
    path: '/goodsManage',
    component: Layout,
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'list',
        component: () => import('@/views/goodsManage/index'),
        meta: {title: '商品管理'}
      },
      {
        path: 'addGoods',
        name: 'addGoods',
        hidden: true,
        component:() => import('@/views/goodsManage/addGoods'),
        meta:{title: '添加&编辑'}
      }
    ]
  },
  {
    // 分类管理
    path: '/classifyManage',
    meta: { title: 'classifyManage', icon: 'link' },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'list',
        component: () => import('@/views/classifyManage/index'),
        meta: {title: '分类管理'}
      },
      {
        path: 'addClassify',
        name: 'addClassify',
        hidden: true,
        component:() => import('@/views/classifyManage/addClassify'),
        meta:{title: '添加分类'}
      }
    ]
  },
  {
    // 邮费模板
    path: '/postageTemplate',
    meta: { title: 'postageTemplate', icon: 'nested' },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'list',
        component: () => import('@/views/postageTemplate/index'),
        meta: {title: '邮费模板'}
      }
    ]
  },
  {
    // 订单管理
    path: '/orderManage',
    meta: { title: 'orderManage', icon: 'link' },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'list',
        component: () => import('@/views/orderManage/index'),
        meta: {title: '订单管理'}
      }
    ]
  },
  {
    // 用户管理
    path: '/userManage',
    meta: { title: 'userManage', icon: 'link' },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'list',
        component: () => import('@/views/userManage/index'),
        meta: {title: '用户管理'}
      }
    ]
  },
  {
    // 广告管理
    path: '/advertising',
    meta: { title: 'advertising', icon: 'link' },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'list',
        component: () => import('@/views/advertising/advertising'),
        meta: {title: '广告管理'}
      }
    ]
  },

  {
    // 系统设置
    path: '/systemSetup',
    meta: { title: 'systemSetup', icon: 'link' },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'list',
        component: () => import('@/views/systemSetup/systemSetup'),
        meta: {title: '系统设置'}
      }
    ]
  },
  {
    // 评论
    path: '/comment',
    meta: { title: 'comment', icon: 'link' },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'list',
        component: () => import('@/views/comment/comment'),
        meta: {title: '评论'}
      }
    ]
  },
  {
    // 管理员
    path: '/administrators',
    meta: { title: 'administrators', icon: 'link' },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'list',
        component: () => import('@/views/administrators/administrators'),
        meta: {title: '管理员'}
      }
    ]
  },
  {
    // 新人专区设置
    path: '/NewbornSetup',
    meta: { title: 'NewbornSetup', icon: 'link' },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'list',
        component: () => import('@/views/NewbornSetup/index'),
        meta: {title: '新人专区设置'}
      }
    ]
  },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
