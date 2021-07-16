// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData:
      wx.canIUse('open-data.type.userAvatarUrl') &&
      wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      })
    }
  },
  getUserProfile(e) {
    console.log('getUserProfile: ', e)
    console.log('this1', this)
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log('success', res)
        console.log('this2', this)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      },
      // 拒绝
      fail: (res) => {
        console.log('fail', res)
      },
      complete: (res) => {
        // console.log('complete', res)
      },
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log('getUserInfo', e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
  },
  openSetting(e) {
    console.log('e: ', e)
  },
  handleClick() {
    console.log(123)
  },
  // 图片上传
  uploadImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(res)
      },
    })
  },
})
