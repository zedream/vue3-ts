import { Module } from 'vuex'
import { RootState } from '@/store'
import { SettledType } from '@/store/mutation.types'
import { GetSellerDetail } from '@/api/settled'

export default {
  namespaced: true,
  state: {
    state: '',
    paymentAuditStatus: ''
  },
  mutations: {
    [SettledType.SET_STATE] (state, value) {
      state.state = value
    },
    [SettledType.SET_PAYMENT_AUDIT_STATUS] (state, value) {
      state.paymentAuditStatus = value
    }
  },
  actions: {
    getSellerDetail ({ commit }, data) {
      return new Promise<SellerDetailData>((resolve, reject) => {
        GetSellerDetail(data).then(res => {
          commit(SettledType.SET_STATE, res.status)
          commit(SettledType.SET_PAYMENT_AUDIT_STATUS, res.paymentAuditStatus)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
} as Module<ModuleStateSettled, RootState>
