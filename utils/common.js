import { getConfigList } from '../api/common'

/**
 * 获取菜单配置
 * @param {String} name 菜单名称
 */
export async function getCheckboxList(name) {
  let res = await getConfigList({ configName: name })
  if (res.data.code === 200) {
    return res.data.data.map((item) => ({
      id: item.id,
      value: item.configValue,
    }))
  }
  return []
}
