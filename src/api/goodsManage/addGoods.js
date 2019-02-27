import request from '@/utils/request'

//商品添加
export function addShop(data) {
  return request({
    url: '/backend/goods/add',
    method: 'post',
    data
  })
}

//订单详情
export function getGoodsInfo(data) {
  return request({
    url: '/backend/goods/info',
    method: 'post',
    data
  })
}

//编辑/backend/category/lstNoPage
export function updateGoods(data) {
  return request({
    url: '/backend/goods/update',
    method: 'post',
    data
  })
}

//分类
export function goodsClassifi(data) {
  return request({
    url: '/backend/category/lstNoPage',
    method: 'post',
    data
  })
}

//分类详情
export function goodsClassifiInfo(data) {
  return request({
    url: '/backend/category/info',
    method: 'post',
    data
  })
}



