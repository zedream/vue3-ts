import { Module } from 'vuex'
import { RootState, store } from '@/store'
import { UserTypes } from '@/store/mutation.types'
import { SignInByVerifyCode, SignInByPassword } from '@/api/auth'
import Storage from '@/utils/storage'
import { StorageExpire, StorageTypes } from '@/types/storage'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    account: Storage.Local.get(StorageTypes.APP_STORE_ACCOUNT_LOCAL),
    corps: Storage.Local.get(StorageTypes.APP_STORE_CORPS_LOCAL) || Storage.Session.get(StorageTypes.APP_TEMP_SETTLED_CORP_SESSION),
    token: Storage.Local.get(StorageTypes.APP_STORE_TOKEN_LOCAL),
    uid: Storage.Local.get(StorageTypes.APP_STORE_UID_LOCAL),
    sellerId: Storage.Local.get(StorageTypes.APP_STORE_SELLER_ID_LOCAL)
  },
  mutations: {
    [UserTypes.SET_ACCOUNT] (state, value) {
      state.account = value
    },
    [UserTypes.SET_CORPS] (state, value) {
      state.corps = value
    },
    [UserTypes.SET_TOKEN] (state, value) {
      state.token = value
    },
    [UserTypes.SET_UID] (state, value) {
      state.uid = value
    },
    [UserTypes.SET_UID] (state, value) {
      state.uid = value
    },
    [UserTypes.SET_SELLER_ID] (state, value) {
      state.sellerId = value
    },
    [UserTypes.CLEAR_CERTIFY] (state) {
      state.account = ''
      state.corps = ''
      state.token = ''
      state.uid = ''
      state.sellerId = ''
      Storage.Local.remove(StorageTypes.APP_STORE_ACCOUNT_LOCAL)
      Storage.Local.remove(StorageTypes.APP_STORE_CORPS_LOCAL)
      Storage.Local.remove(StorageTypes.APP_STORE_TOKEN_LOCAL)
      Storage.Local.remove(StorageTypes.APP_STORE_UID_LOCAL)
      Storage.Local.remove(StorageTypes.APP_STORE_SELLER_ID_LOCAL)
    }
  },
  actions: {
    signInByVerifyCode ({ commit }, form) {
      return new Promise<void>((resolve, reject) => {
        SignInByVerifyCode(form).then((data) => {
          store.dispatch('user/signInSuccess', data).then(() => {
            resolve()
          })
        }).catch(error => {
          reject(error)
        })
      })
    },
    signInByPassword ({ commit }, form) {
      return new Promise<void>((resolve, reject) => {
        SignInByPassword(form).then((data) => {
          store.dispatch('user/signInSuccess', data).then(() => {
            resolve()
          })
        }).catch(error => {
          reject(error)
        })
      })
    },
    signInSuccess ({ commit }, data) {
      commit(UserTypes.SET_ACCOUNT, data.mobile)
      commit(UserTypes.SET_TOKEN, data.token)
      commit(UserTypes.SET_UID, data.userId)
      commit(UserTypes.SET_SELLER_ID, data.sellerId)
      Storage.Local.set(StorageTypes.APP_STORE_ACCOUNT_LOCAL, data.mobile, StorageExpire.Week)
      Storage.Local.set(StorageTypes.APP_STORE_TOKEN_LOCAL, data.token, StorageExpire.Week)
      Storage.Local.set(StorageTypes.APP_STORE_UID_LOCAL, data.userId, StorageExpire.Week)
      Storage.Local.set(StorageTypes.APP_STORE_SELLER_ID_LOCAL, data.sellerId, StorageExpire.Week)
    },
    signOut ({ commit }) {
      return new Promise<void>((resolve) => {
        commit(UserTypes.CLEAR_CERTIFY)
        router.push('/login').then(() => {
          resolve()
        })
      })
    }
  }
} as Module<ModuleStateUser, RootState>
