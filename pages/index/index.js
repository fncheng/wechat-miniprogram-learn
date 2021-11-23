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
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') &&
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
  getSetting(e) {
    wx.getSetting({
      withSubscriptions: false,
      success(res) {
        console.log('res: ', res)
      },
      fail(err) {
        console.log('err: ', err)
      },
      complete(e) {
        console.log('e: ', e)
      },
    })
  },
  login() {
    wx.login({
      success(res) {
        console.log('res: ', res)
        if (res.code) {
          console.log('登录成功')
          //发起网络请求
          // wx.request({
          //   url: 'https://example.com/onLogin',
          //   data: {
          //     code: res.code,
          //   },
          // })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
    })
  },
  authorize() {
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    wx.getSetting({
      success(res) {
        // 未授权用户信息
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.record',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.startRecord()
            },
          })
        }
        console.log('已授权用户信息')
      },
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
  navigateTo() {
    wx.navigateTo({
      url: `/pages/vant/vant?name='zs'&age=18`,
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (data) {
          console.log(data)
        },
        someEvent: function (data) {
          console.log(data)
        }
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: 'test'
        })
      }
    })
  },
  redirectTo() {
    wx.redirectTo({
      url: `/pages/home/home`,
      success(res) {
        console.log('res: ', res)
      },
      fail(err) {
        console.log('err: ', err)
      },
    })
  },

  bindMyTap(e) {
    console.log('bindMyTap', e);
  },
  onClick(e) {
    console.log(e);
    wx.request({
      url: 'https://baidu.com',
      data: {
        name: 'zs'
      },
      success(res) {
        console.log('success', res);
      },
      method: 'GET'
    })
  }
})