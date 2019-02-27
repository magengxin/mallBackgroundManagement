import request from '@/utils/request'

// 分类实物列表/backend/category/del
export function ClassifiedObjectsList(data) {
  return request({
    url: '/backend/category/lst',
    method: 'post',
    data
  })
}

// 分类实物列表
export function categoryDel(data) {
  return request({
    url: '/backend/category/del',
    method: 'post',
    data
  })
}

// 分类实物添加
export function categoryAdd(data) {
  return request({
    url: '/backend/category/add',
    method: 'post',
    data
  })
}

// 分类实物编辑详情
export function categoryInfo(data) {
  return request({
    url: '/backend/category/info',
    method: 'post',
    data
  })
}

// 分类实物编辑修改
export function categoryUpdate(data) {
  return request({
    url: '/backend/category/update',
    method: 'post',
    data
  })
}

