import $http from './index'

/**
 * @description: 获取配置选项
 * @param {String} data.configName 配置类型
 */
export function getConfigList(data) {
  return $http({
    url: '/systemConfig/getConfigList',
    method: 'POST',
    data,
    contentType: 'application/x-www-form-urlencoded',
  })
}

/**
 * @description: 查新所有产品列表
 */
export function getPdList() {
  return $http({
    url: '/product/queryProduct',
    method: 'GET',
  })
}
