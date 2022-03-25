import $http from './index'

/**
 * @description: 获取潜力信息审批列表
 */
export function getApproveList(data) {
  return $http({
    url: '/potential/approvalList',
    method: 'POST',
    data,
  })
}

/**
 * @description: 潜力信息审批
 */
export function potApprove(data) {
  return $http({
    url: '/potential/approval',
    method: 'POST',
    data,
  })
}
