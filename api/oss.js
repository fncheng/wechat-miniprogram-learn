import $http from './index'

export function createToken(data) {
  return $http({
    url: '/saasuser/sysUserDetail/createToken',
    method: 'post',
    data
  })
}