import request from '@/request'
/**
 * 获取登录验证码
 */
export const SmsVerifyCode = (data) => new Promise<void>((resolve, reject) => {
  request.post('/mall/seller/user/sendsms', data).then((res) => {
    resolve()
  }).catch(error => {
    reject(error)
  })
})
/**
 * 验证码登录
 */
export const SignInByVerifyCode = (data) => new Promise<VerifyCodeLoginData>((resolve, reject) => {
  request.post('/mall/seller/user/login/mobile', data).then((res) => {
    resolve(res.data)
  }).catch(error => {
    reject(error)
  })
})
/**
 * 密码登录
 */
export const SignInByPassword = data => new Promise<PasswordLoginData>((resolve, reject) => {
  request.post('/mall/seller/user/login/password', data).then((res) => {
    resolve(res.data)
  }).catch(error => {
    reject(error)
  })
})
/**
 * 获取图片验证码
 */
export const GetSlider = data => new Promise<GetSliderData>((resolve) => {
  request.get('/mall/seller/user/getSlider', data).then((res) => {
    resolve(res.data)
  })
})
/**
 * 校验图片验证码
 */
export const CheckSlider = data => new Promise<void>((resolve, reject) => {
  request.post('/mall/seller/user/verifySlider', data).then((res) => {
    resolve()
  }).catch(error => {
    reject(error)
  })
})
/**
 * 修改密码
 */
export const UpdatePassword = data => new Promise<void>((resolve, reject) => {
  request.post('/mall/seller/user/change/password', data).then((res) => {
    resolve()
  }).catch(error => {
    reject(error)
  })
})
