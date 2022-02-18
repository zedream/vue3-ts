import axios from 'axios'
import { StorageTypes } from '@/types/storage'
import Storage from '@/utils/storage'
import { version } from '../../config/config'
import router from '@/router'

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 10 * 1000,
  headers: {
    boTerm: 'PC',
    boVer: version,
    boDes: '0',
    'content-type': 'application/json'
  }
})

instance.interceptors.request.use((config) => {
  Object.assign(config.headers, {
    Authorization: `Bearer ${Storage.Local.get(StorageTypes.APP_STORE_TOKEN_LOCAL)}`
  })
  return config
}, (error) => Promise.reject(error))

instance.interceptors.response.use((response) => {
  if (response.data.errorCode === 'A0107') {
    router.replace({ name: 'NotAuthorized' })
  } else if (response.data.errorCode === 'B0001') {
    router.replace({ name: 'ServerError' })
  }
  return response
}, (error) => Promise.reject(error))

export default instance
