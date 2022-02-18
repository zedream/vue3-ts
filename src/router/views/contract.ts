import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/contract',
    redirect: '/contractManage',
    name: 'Contract',
    meta: {
      title: '合同管理',
      header: true,
      menu: true,
      tag: false,
      footer: false,
      auth: true,
      icon: 'icon-contract-manage'
    },
    component: () => import(/* webpackChunkName: "contract" */ '@/components/Layout/index.vue'),
    children: [
      {
        path: '/contractManage',
        name: 'ContractManage',
        meta: {
          title: '合同管理',
          header: true,
          menu: true,
          tag: true,
          footer: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "contract" */ '@/views/contract/ContractManage.vue')
      }
    ]
  }
]

export default routes
