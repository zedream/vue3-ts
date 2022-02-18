import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/goods',
    redirect: '/goodsManage',
    name: 'Goods',
    meta: {
      title: '商品管理',
      header: true,
      menu: true,
      tag: false,
      footer: false,
      auth: true,
      icon: 'icon-customer-manage'
    },
    component: () => import(/* webpackChunkName: "goods" */ '@/components/Layout/index.vue'),
    children: [
      {
        path: '/goodsManage',
        name: 'GoodsManage',
        meta: {
          title: '商品管理',
          header: true,
          menu: true,
          tag: true,
          footer: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "goods" */ '@/views/goods/GoodsManage.vue')
      },
      {
        path: '/goodsManage/:code',
        name: 'GoodsEdit',
        meta: {
          title: '',
          header: true,
          menu: true,
          tag: false,
          footer: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "goods" */ '@/views/goods/GoodsAddOrEdit.vue')
      }
    ]
  }
]

export default routes
