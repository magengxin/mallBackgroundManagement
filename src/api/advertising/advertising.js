import request from '@/utils/request'


//广告列表
export function advertisementList(data) {
  return request({
    url: '/backend/Ad/lst',
    method: 'post',
    data
  })
}

//删除广告
export function deleteAdver(data) {
  return request({
    url: '/backend/Ad/del',
    method: 'post',
    data
  })
}

//广告上架下架
export function upperLower(data) {
  return request({
    url: '/backend/Ad/editStatus',
    method: 'post',
    data
  })
}

//奖池列表
export function poolListInterface(data) {
  return request({
    url: '/backend/AdPool/lst',
    method: 'post',
    data
  })
}

//删除奖池列表
export function deletepoolList(data) {
  return request({
    url: '/backend/AdPool/del',
    method: 'post',
    data
  })
}

//奖池列表添加
export function addPoolList(data) {
  return request({
    url: '/backend/AdPool/add',
    method: 'post',
    data
  })
}

//奖池列表上下架
export function addPoolupperLower(data) {
  return request({
    url: '/backend/AdPool/add',
    method: 'post',
    data
  })
}

//奖池编辑详情
export function msgAwardPoolEditor(data) {
  return request({
    url: '/backend/AdPool/detail',
    method: 'post',
    data
  })
}

//奖池编辑确认
export function awardPoolEditor(data) {
  return request({
    url: '/backend/AdPool/edit',
    method: 'post',
    data
  })
}

//设置显示商品列表
export function setShowGoodList(data) {
  return request({
    url: 'backend/Ad/relationGoodsLst',
    method: 'post',
    data
  })
}

//商品列表
export function searchShop(data) {
  return request({
    url: '/backend/goods/lst',
    method: 'post',
    data
  })
}

//发送选中商品列表
export function selectionCheckBox(data) {
  return request({
    url: '/backend/Ad/doRelationGoods',
    method: 'post',
    data
  })
}

//添加广告
export function addAdvertisementReturn(data) {
  return request({
    url: '/backend/Ad/add',
    method: 'post',
    data
  })
}
