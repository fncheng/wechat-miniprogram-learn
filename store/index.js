import { observable, action } from 'mobx-miniprogram'
export const store = observable({
  _name: 'global store',
  get queryDate() {
    console.log('获取全局时间', this._name)
    return this._name
  },
  update: action(function (val) {
    this._name = val
    console.log('update', this)
  })
})
