import { Module } from 'vuex'
import { RootState, store } from '@/store'
import { CommonType, MenuTagType, RemoveTag } from '@/store/mutation.types'
import Storage from '@/utils/storage'
import { StorageExpire, StorageTypes } from '@/types/storage'
import { app } from '../../../config/config'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    tags: (() => {
      const storageTags = Storage.Session.get(StorageTypes.APP_STORE_MENU_TAG_TAGS_SESSION)
      if (storageTags) {
        const tags = JSON.parse(storageTags)
        const indexPos = tags.findIndex(_ => _.path === app.indexPath)
        // 当首页tag不在第0位时， 调整至第0位
        if (indexPos !== 0) {
          const index = tags.splice(indexPos, 1)
          tags.unshift(index[0])
        }
        return tags
      } else {
        if (app.fixIndex) {
          return [{
            path: app.indexPath,
            title: '首页'
          }]
        } else {
          return []
        }
      }
    })()
  },
  mutations: {
    [MenuTagType.ADD_TAG] (state, value) {
      if (!state.tags.find(_ => _.path === value.path)) {
        const tag = {
          path: value.path,
          title: value.meta.title
        }
        state.tags.push(tag)
        Storage.Session.set(StorageTypes.APP_STORE_MENU_TAG_TAGS_SESSION, state.tags, StorageExpire.Year)
        /**
         * @description menu tags手动滚动按钮显隐逻辑
         * @author Tang Hao(1115491560@qq.com)
         * @date 2022-2-12 上午 3:18
         * 统一在tag增减源头处理
         * 此处nextTick必须，否则第一次内容溢出不会显示按钮（视图更新后执行逻辑控制按钮显隐）
         */
        nextTick(() => {
          const tagScroll: HTMLElement | null = document.querySelector('#menu-tag-scroll-view')
          store.commit(`common/${CommonType.SET_TAGS_SCROLL_BTN}`, tagScroll && (tagScroll.scrollWidth > tagScroll.clientWidth))
        })
      }
    },
    [MenuTagType.REMOVE_TAG] (state, value: { type: RemoveTag, path?: string }) {
      const currentPath = router.currentRoute.value.path
      const currentIdx = state.tags.findIndex(_ => _.path === currentPath)
      const tagsMaxIdx = state.tags.length - 1
      let delIdx = -1
      // 只剩最后一个tag时不再关闭
      if (tagsMaxIdx === 0) return
      switch (value.type) {
        case RemoveTag.REMOVE_CURRENT:
          if (app.fixIndex && currentPath === app.indexPath) return
          delIdx = state.tags.findIndex(_ => _.path === currentPath)
          state.tags.splice(delIdx, 1)
          if (delIdx === tagsMaxIdx) {
            router.push(state.tags[tagsMaxIdx - 1].path)
          } else {
            router.push(state.tags[delIdx].path)
          }
          break
        case RemoveTag.REMOVE_OTHER:
          /**
           * 逻辑待优化
           * 目前处理逻辑的前提是首页tag已被固定在第0位
           */
          state.tags.splice(1, currentIdx - 1)
          state.tags.splice(2, tagsMaxIdx - currentIdx)
          break
        case RemoveTag.REMOVE_ALL:
          state.tags = [{
            path: app.indexPath,
            title: '首页'
          }]
          router.push(app.indexPath)
          break
        case RemoveTag.REMOVE_ALL_TO_LEFT:
          /**
           * 逻辑待优化
           * 目前处理逻辑的前提是首页tag已被固定在第0位
           */
          state.tags.splice(1, currentIdx - 1)
          break
        case RemoveTag.REMOVE_ALL_TO_RIGHT:
          state.tags.splice(currentIdx + 1, tagsMaxIdx - currentIdx)
          break
        case RemoveTag.REMOVE_BY_PATH:
          delIdx = state.tags.findIndex(_ => _.path === value.path)
          state.tags.splice(delIdx, 1)
          // 当移除的tag与当前路由的path相等时，需要自动切换到其右边的tag所指向的路由
          if (currentPath === value.path) {
            // 如果被删除的是最后一个tag则切换到其左边的tag
            if (delIdx === tagsMaxIdx) {
              router.push(state.tags[tagsMaxIdx - 1].path)
            } else {
              router.push(state.tags[delIdx].path)
            }
          }
          break
        default:
          break
      }
      Storage.Session.set(StorageTypes.APP_STORE_MENU_TAG_TAGS_SESSION, state.tags, StorageExpire.Year)
      /**
       * @description menu tags手动滚动按钮显隐逻辑
       * @author Tang Hao(1115491560@qq.com)
       * @date 2022-2-12 上午 3:18
       * 统一在tag增减源头处理
       */
      nextTick(() => {
        const tagScroll: HTMLElement | null = document.querySelector('#menu-tag-scroll-view')
        store.commit(`common/${CommonType.SET_TAGS_SCROLL_BTN}`, tagScroll && (tagScroll.scrollWidth > tagScroll.clientWidth))
      })
    },
    [MenuTagType.CLEAR_TAG] (state) {
      state.tags = []
      Storage.Session.remove(StorageTypes.APP_STORE_MENU_TAG_TAGS_SESSION)
    }
  }
} as Module<ModuleStateMenuTag, RootState>
