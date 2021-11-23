// component/comp/comp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  attached() {
    this.onTap()
  },
  methods: {
    onTap(e) {
      let myEventDetail = {
        name: 'name',
      }
      let myEventOption = {
        age: 'age',
      }
      console.log('onTap', e)
      this.triggerEvent('mytap', myEventDetail, myEventOption)
    },
  },
})
