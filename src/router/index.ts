import { createRouter, createWebHistory } from 'vue-router'
import pageRoutes from './pages.routes'
import viewRoutes from './views.routes'
import { StorageTypes } from '@/types/storage'
import Storage from '@/utils/storage'
import { name } from '../../config/config'
import { store } from '@/store'
import { MenuTagType } from '@/store/mutation.types'

const router = createRouter({
  history: createWebHistory(process.env.PUBLIC_PATH),
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  // linkExactActiveClass: 'is-active',
  routes: [
    ...viewRoutes,
    ...pageRoutes
  ]
})

router.beforeEach((to, from, next) => {
  const token = Storage.Local.get(StorageTypes.APP_STORE_TOKEN_LOCAL)
  if (to.meta.tag) {
    store.commit(`menuTag/${MenuTagType.ADD_TAG}`, to)
    /**
     * @description menu tags自动滚动逻辑
     * @author Tang Hao(1115491560@qq.com)
     * @date 2022-2-12 上午 3:17
     * bug 当增加tag时如果溢出，则无法自动滚动
     * 问题不大，以后处理
     */
    const tagScroll: HTMLElement | null = document.querySelector('#menu-tag-scroll-view')
    const aTag: HTMLElement | null = document.querySelector(`a[tag-name='${to.path}']`)
    if (aTag && tagScroll) {
      if (aTag.offsetLeft - tagScroll.offsetLeft + aTag.clientWidth > tagScroll.scrollLeft + tagScroll.clientWidth) {
        tagScroll.scrollLeft = aTag.offsetLeft + aTag.clientWidth - tagScroll.clientWidth / 2 - tagScroll.offsetLeft
      } else if (aTag.offsetLeft - tagScroll.offsetLeft < tagScroll.scrollLeft) {
        tagScroll.scrollLeft = aTag.offsetLeft - tagScroll.offsetLeft - tagScroll.clientWidth / 2
      }
    }
  }
  if (!token && to.meta.auth && to.path !== '/lock') {
    ElMessage.warning('请先登录')
    next('/login')
  } else {
    document.title = `${to.meta.title} - ${name}`
    if (+store.state.common.lock === 1 && to.path !== '/lock') {
      next('/lock')
    } else {
      next()
    }
  }
})

export default router
