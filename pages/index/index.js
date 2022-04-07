import { createToken } from '../../api/oss'
import { MINI_APP_HTTP_UPLOAD } from '../../config/index'
// 获取应用实例
const app = getApp()
const recorderManager = wx.getRecorderManager()

Page({
  data: {
    motto: 'Hello World',
    inputText: '按住 说话',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData:
      wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
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
          hasUserInfo: true
        })
      },
      // 拒绝
      fail: (res) => {
        console.log('fail', res)
      },
      complete: (res) => {
        // console.log('complete', res)
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log('getUserInfo', e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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
      }
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
      }
    })
  },
  authorize() {
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    wx.getSetting({
      success(res) {
        console.log('getSetting res: ', res)
        // 未授权用户信息
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success(res) {
              console.log('wx.authorize res: ', res)
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
            },
            fail(err) {
              console.log('err: ', err)
              wx.openSetting({
                success(res) {
                  console.log('wx.openSetting res: ', res)
                }
              })
            }
          })
        }
        console.log('已授权用户信息')
      }
    })
  },
  openSetting(e) {
    console.log('e: ', e)
  },
  /**
   * @description: 获取手机号
   * @param {*}
   * @return {*}
   */
  getPhoneNumber(e) {
    console.log('获取手机号: ', e.detail.code)
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
      }
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
      }
    })
  },

  bindMyTap(e) {
    console.log('bindMyTap', e)
  },
  onClick(e) {
    console.log(e)
    wx.request({
      url: 'https://baidu.com',
      data: {
        name: 'zs'
      },
      success(res) {
        console.log('success', res)
      },
      method: 'GET'
    })
  },
  startRecord() {
    this.setData({
      inputText: '松开 结束'
    })
    console.log('录音')
    recorderManager.onStart(() => {
      console.log('recorder start')
    })

    const options = {
      duration: 10000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3',
      frameSize: 50
    }
    recorderManager.start(options)
  },
  stopRecord() {
    console.log('结束录音')
    recorderManager.onStop(async (res) => {
      console.log('recorder stop', res)
      const { tempFilePath } = res
      console.log('tempFilePath: ', tempFilePath)
      let res1 = await createToken({
        bucket: 'mp3',
        isCover: '',
        name: '1642399898033.mp3',
        size: 31540,
        password: '',
        userName: ''
      })
      if (res1.data.code === 200) {
        let ossToken = res1.data.data
        wx.uploadFile({
          url: 'https://saas-dev.zy-health.net:7799/oss/file/storage', // 仅为示例，非真实的接口地址
          filePath: tempFilePath,
          name: 'files',
          header: {
            token: wx.getStorageSync('token'),
            deviceTag: 'app',
            'content-type': 'multipart/form-data'
          },
          formData: { ossToken },
          success: (res2) => {
            let data = JSON.parse(res2.data)
            console.log('res: 1111', data)
            if (res.data.code === 200) {
              console.log('12313131')
              console.log('上传语音地址:', MINI_APP_HTTP_UPLOAD + res2.data.msg)
            }
            // 上传完成需要更新 fileList
            // const { fileList = [] } = this.data
            // const result = JSON.parse(res.data)
            // // console.log('res.data.msg: ', result.msg)
            // fileList.push({ ...file, url: `${MINIAPP_IMAGE_URL}/${result.msg}` })
            // this.setData({ fileList })
          }
        })
      }
    })
    recorderManager.stop()
  }
})
