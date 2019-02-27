import request from '@/utils/request'

//商品列表
export function searchShop(data) {
  return request({
    url: '/backend/goods/lst',
    method: 'post',
    data
  })
}

//删除列表
export function removeShop(data) {
  return request({
    url: '/backend/goods/del',
    method: 'post',
    data
  })
}

//后台商品上下架接口
export function goodsUpper(data) {
  return request({
    url: '/backend/goods/upanddown',
    method: 'post',
    data
  })
}
