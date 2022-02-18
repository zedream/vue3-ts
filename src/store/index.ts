import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import user from '@/store/modules/user'
import settled from '@/store/modules/settled'
import menuTag from '@/store/modules/menuTag'
import common from '@/store/modules/common'

export interface RootState {
  empty: unknown
}

export interface TypeModule extends RootState {
  common: ModuleStateCommon
  menuTag: ModuleStateMenuTag
  settled: ModuleStateSettled
  user: ModuleStateUser
}

interface TypeStore extends Store<RootState> {
  state: TypeModule
}

export const key: InjectionKey<Store<TypeModule>> = Symbol('InjectionKey')

export const store = createStore<RootState>({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    user,
    settled,
    menuTag,
    common
  },
  mutations: {
    CLEAR_STATE (state: object) {
      Object.keys(state).forEach(storeKey => {
        Object.keys(state[storeKey]).forEach(stateKey => {
          if (Array.isArray(state[storeKey][stateKey])) {
            state[storeKey][stateKey] = []
          } else if (typeof state[storeKey][stateKey] === 'boolean') {
            state[storeKey][stateKey] = false
          } else {
            state[storeKey][stateKey] = ''
          }
        })
      })
    }
  }
}) as unknown as TypeStore

export function useStore<T = TypeModule> () {
  return baseUseStore<T>(key)
}
