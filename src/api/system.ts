import request from '@/request'
/**
 * 获取商户下所有角色
 */
export const GetRoles = data => new Promise<RoleListData[]>((resolve, reject) => {
  request.get('/mall/auth/role/', data).then((res) => {
    resolve(res.data)
  }).catch(error => {
    reject(error)
  })
})
/**
 * 获取商户下员工列表
 */
export const GetEmployee = data => new Promise<PageData<EmployeeListData>[]>((resolve, reject) => {
  request.post('/mall/sellerUser/userManage/listSellerUser', data).then((res) => {
    resolve(res.data)
  }).catch(error => {
    reject(error)
  })
})
