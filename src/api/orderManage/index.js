import request from '@/utils/request'

export function orderList(data) {
  return request({
    url: '/backend/order/lst',
    method: 'post',
    data
  })
}
// detail
export function orderDetail (data) {
  return request({
    url: '/backend/order/info',
    method: 'post',
    data
  })
}
// 发货
export function confirmDelivery (data) {
  return request({
    url: '/backend/order/addLogistics',
    method: 'post',
    data
  })
}

//导出
export function exportExcel(data) {
  return request({
    url: '/backend/order/exportExcel',
    method: 'post',
    data
  })
}
