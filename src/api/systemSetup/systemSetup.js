import request from '@/utils/request'

//保存
export function setupSave (data) {
  return request({
    url: '/backend/parameter/setParams',
    method: 'post',
    data
  })
}


//获取
export function obtain (data) {
  return request({
    url: '/backend/parameter/info',
    method: 'post',
    data
  })
}
