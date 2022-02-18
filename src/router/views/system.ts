import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/system',
    redirect: '/roleManage',
    name: 'System',
    meta: {
      title: '系统管理',
      header: true,
      menu: true,
      tag: false,
      footer: false,
      auth: true,
      icon: 'icon-system-manage'
    },
    component: () => import(/* webpackChunkName: "system" */ '@/components/Layout/index.vue'),
    children: [
      {
        path: '/roleManage',
        name: 'RoleManage',
        meta: {
          title: '组织角色',
          header: true,
          menu: true,
          tag: true,
          footer: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "system" */ '@/views/system/RoleManage.vue')
      },
      {
        path: '/employeeManage',
        name: 'EmployeeManage',
        meta: {
          title: '员工管理',
          header: true,
          menu: true,
          tag: true,
          footer: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "system" */ '@/views/system/EmployeeManage.vue')
      },
      {
        path: '/configuration',
        name: 'Configuration',
        meta: {
          title: '常量配置',
          header: true,
          menu: true,
          tag: true,
          footer: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "system" */ '@/views/system/ConfigManage.vue')
      },
      {
        path: '/approvalProcess',
        name: 'ApprovalProcess',
        meta: {
          title: '审批流程管理',
          header: true,
          menu: true,
          tag: true,
          footer: false,
          auth: true
        },
        component: () => import(/* webpackChunkName: "system" */ '@/views/system/ApprovalProcess.vue')
      }
    ]
  }
]

export default routes
