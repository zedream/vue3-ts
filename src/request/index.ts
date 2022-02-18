import axios from './axios'

class HttpRequest implements RequestMethods {
  get (url, params?) {
    return new Promise<ResponseData>((resolve, reject) => {
      axios.get(url, { params }).then((res) => {
        if (res.data.errorCode === '00000') {
          resolve(res.data)
        } else {
          ElMessage.error(`${res.data.msg}: ${res.data.errorCode}`)
          reject(res.data.msg)
        }
      }).catch((error) => {
        reject(error)
      })
    })
  }

  post (url, data) {
    return new Promise<ResponseData>((resolve, reject) => {
      axios.post(url, data).then((res) => {
        if (res.data.errorCode === '00000') {
          resolve(res.data)
        } else {
          ElMessage.error(`${res.data.msg}: ${res.data.errorCode}`)
          reject(res.data.msg)
        }
      }).catch((error) => {
        reject(error)
      })
    })
  }
}

export default new HttpRequest()
