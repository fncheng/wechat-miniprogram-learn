import $http from './index'

/**
 * @description: 获取会议列表
 */
export function getMeetingList(data) {
  return $http({
    url: '/meeting/appQueryMeetingInfoPage',
    method: 'POST',
    data,
  })
}

/**
 * @description: 根据会议id获取计划参会者下拉列表
 */
export function getVisitList(data) {
  return $http({
    url: '/meeting/queryJoinMeetingPeopleList',
    method: 'POST',
    data,
  })
}

/**
 * @description: 提交会议反馈
 */
export function setMeetingFeedback(data) {
  return $http({
    url: '/meeting/appMeetingFeedback',
    method: 'POST',
    data,
  })
}
