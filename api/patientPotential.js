import $http from './index'

/**
 * @description: 新增客户-APP
 */
export function addCustomerInfo(data) {
  return $http({
    url: '/customer/addCustomerInfo',
    method: 'POST',
    data,
  })
}

/**
 * @description: 新增潜力信息
 */
 export function addPotentialInfo(data) {
  return $http({
    url: '/potential/addPotentialInfo',
    method: 'POST',
    data,
  })
}