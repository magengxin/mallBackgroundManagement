import request from '@/utils/request'

export function login(username, password,remember) {
  return request({
    url: '/backend/user/login',
    method: 'post',
    data: {
      username,
      password,
      remember
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
