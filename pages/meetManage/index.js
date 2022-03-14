// pages/meetManage/index.js
import dayjs from 'dayjs'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    actions: [
      {
        name: '选项',
      },
      {
        name: '选项',
      },
      {
        name: '选项',
        subname: '描述信息',
        openType: 'share',
      },
    ],
    currentDate: dayjs().format('YYYY-MM-DD'),
    currentTime: dayjs().format('HH:mm'),
    radio: '1',
  },
  onClose() {
    // this.setData({ show: false })
  },

  onSelect(event) {
    // console.log(event.detail)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorageSync('1a', 123)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
