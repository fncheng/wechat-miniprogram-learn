import $http from './index'

/**
 * @description: 会议列表-APP
 */
export function getMeetingList(data) {
  return $http({
    url: '/meeting/appQueryMeetingInfoPage',
    method: 'POST',
    data,
  })
}

/**
 * @description: 会议列表-APP
 */
 export function getVisitList(data) {
  return $http({
    url: '/visit/visitList',
    method: 'POST',
    data,
  })
}