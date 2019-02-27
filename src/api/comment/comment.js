import request from '@/utils/request'

//评论列表
export function commentList(data) {
  return request({
    url: '/backend/comments/lst',
    method: 'post',
    data
  })
}

//评论审核
export function toExamine(data) {
  return request({
    url: '/backend/comments/isCheck',
    method: 'post',
    data
  })
}

// 评论推荐
export function Recommend(data) {
  return request({
    url: '/backend/comments/isRecommend',
    method: 'post',
    data
  })
}

// 评论详情确认
export function commentMsg(data) {
  return request({
    url: '/backend/comments/addReply',
    method: 'post',
    data
  })
}

// 打开评论详情
export function openCommentMsg(data) {
  return request({
    url: '/backend/comments/info',
    method: 'post',
    data
  })
}



