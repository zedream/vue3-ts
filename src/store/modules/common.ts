import { Module } from 'vuex'
import { CommonType } from '@/store/mutation.types'
import Storage from '@/utils/storage'
import { StorageExpire, StorageTypes } from '@/types/storage'
import { RootState } from '@/store'

export default {
  namespaced: true,
  state: {
    cityList: [],
    oilModel: [],
    logisticsCorps: [],
    showTagsScrollBtn: false,
    lock: Storage.Local.get(StorageTypes.APP_STORE_COMMON_LOCK) || 0,
    lockPwd: Storage.Local.get(StorageTypes.APP_STORE_COMMON_LOCK_PWD),
    lockMsg: Storage.Local.get(StorageTypes.APP_STORE_COMMON_LOCK_MSG)
  },
  mutations: {
    [CommonType.SET_CITY_LIST] (state, value) {
      state.cityList = value
    },
    [CommonType.SET_OIL_MODEL] (state, value) {
      state.oilModel = value
    },
    [CommonType.SET_LOGISTIC_CORPS] (state, value) {
      state.logisticsCorps = value
    },
    [CommonType.SET_TAGS_SCROLL_BTN] (state, value) {
      state.showTagsScrollBtn = value
    },
    [CommonType.SET_LOCK] (state, value) {
      state.lock = value
      Storage.Local.set(StorageTypes.APP_STORE_COMMON_LOCK, value, StorageExpire.Year)
      if (+value !== 1) {
        Storage.Local.remove(StorageTypes.APP_STORE_COMMON_LOCK)
        Storage.Local.remove(StorageTypes.APP_STORE_COMMON_LOCK_PWD)
        Storage.Local.remove(StorageTypes.APP_STORE_COMMON_LOCK_MSG)
      }
    },
    [CommonType.SET_LOCK_PWD] (state, value) {
      state.lockPwd = value
      Storage.Local.set(StorageTypes.APP_STORE_COMMON_LOCK_PWD, value, StorageExpire.Year)
    },
    [CommonType.SET_LOCK_MSG] (state, value) {
      state.lockMsg = value
      Storage.Local.set(StorageTypes.APP_STORE_COMMON_LOCK_MSG, value, StorageExpire.Year)
    }
  }
} as Module<ModuleStateCommon, RootState>
