import $http from './index'

/**
 * @description: 获取配置选项
 */
export function getConfigList(data) {
  return $http({
    url: '/systemConfig/getConfigList',
    method: 'POST',
    data,
    contentType: 'application/x-www-form-urlencoded',
  })
}
