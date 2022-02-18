/**
 * window.onload时执行的方法
 */
import { store } from '@/store'
import { StorageTypes } from '@/types/storage'
import Storage from '@/utils/storage'

store.state.user.token &&
store.dispatch('settled/getSellerDetail', { sellerId: Storage.Local.get(StorageTypes.APP_STORE_SELLER_ID_LOCAL) })

const refreshExecution = () => {
  Storage.Local.get(StorageTypes.APP_STORE_TOKEN_LOCAL) &&
  store.dispatch('settled/getSellerDetail', { sellerId: Storage.Local.get(StorageTypes.APP_STORE_SELLER_ID_LOCAL) })
}

export {
  refreshExecution
}
