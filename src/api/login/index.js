import request from '@/utils/request'

//登录
export function adminLogin(data) {
  return request({
    url: '/backend/admin/login',
    method: 'post',
    data
  })
}
