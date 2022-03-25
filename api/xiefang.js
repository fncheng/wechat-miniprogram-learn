import $http from './index'

/**
 * @description: 我的协访计划
 */
export function getMyPlanList(data) {
  return $http({
    url: '/synergy/querySynergyPlanList',
    method: 'POST',
    data,
  })
}

/**
 * @description: 查询下属拜访计划
 */
export function getSubPlanList(data) {
  return $http({
    url: '/visit/querySubordinatePlan',
    method: 'POST',
    data,
  })
}

/**
 * @description: 创建协访计划
 */
export function createXfPlan(data) {
  return $http({
    url: '/synergy/createSynergyPlan',
    method: 'POST',
    data,
  })
}
