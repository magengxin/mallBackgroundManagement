import request from '@/utils/request'

//用户列表
export function userList (data) {
  return request({
    url: '/backend/profile/lst',
    method: 'post',
    data
  })
}


//用户地址列表
export function userAdressList (data) {
  return request({
    url: '/backend/profile/address',
    method: 'post',
    data
  })
}
