// pages/home/home.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 'b',
    list: [],
    value: '1',
    boolean: false,
    arrayList: [
      {
        name: '1',
        value: 1
      },
      {
        name: '2',
        value: 2
      },
      {
        name: '3',
        value: 3
      }
    ],
    imgSrc: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log('跳转完成')
    this.setData({
      list: [1, 2, 3],
      value: 2,
      name: 'zs'
    })
    this.data.value = 123
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.value = 456
    const ctx = wx.createCanvasContext('testCanvas')
    ctx.drawImage('./84718876_p1.jpg', 0, 0, 320, 200)
    ctx.draw()
    console.log('ctx: ', ctx)
    const query = wx.createSelectorQuery()
    const canvas = query.select('#testCanvas')
    query.exec(function (res) {
      console.log('res: ', res[0])
    })
    console.log('canvas: ', canvas)
  },

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
  onMessage(e) {
    console.log('收到消息', e)
  },
  tabChange({ detail }) {
    console.log('e111: ', detail)
  },
  chooseImage() {
    let that = this
    console.log('选择图片')
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      success: (res) => {
        console.log('图片选择成功res', res)
        this.setData({
          imgSrc: res.tempFilePaths[0]
        })
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: (res) => {
            console.log('获取图片信息', res)
            if (res.width > 1920 || res.height > 1920) {
              console.log('开始canvas')
              const ctx = wx.createCanvasContext('myCanvas')
              ctx.drawImage(res.path, 0, 0)
              ctx.draw(wx.canvasToTempFilePath())
            }
          }
        })
      }
    })
  },
  async asyncChooseMedia() {
    let that = this
    /* 选择图片 */
    let res1 = await wx.chooseMedia({
      count: 1,
      sizeType: ['original', 'compressed']
    })
    console.log('图片选择成功res1', res1)
    this.setData({
      imgSrc: res1.tempFiles[0].tempFilePath
    })
    /* 获取图片信息 */
    let res2 = await wx.getImageInfo({
      src: res1.tempFiles[0].tempFilePath
    })
    console.log('获取图片信息', res2)
    if (res2.width > 1920 || res2.height > 1920) {
      /* 压缩图片 */
      let res3 = await wx.compressImage({
        src: res2.path,
        quality: 2
      })
      console.log('压缩成功res: ', res3)
      this.setData({
        imgSrc: res3.tempFilePath
      })
      let res4 = await wx.getImageInfo({
        src: res3.tempFilePath
      })
      console.log('压缩后图片res: ', res4)
      wx.saveImageToPhotosAlbum({
        filePath: res4.path
      })
        .then((res) => {
          console.log('保存图片: ', res)
        })
        .catch((err) => {
          console.log('保存图片失败', err)
        })
    }
  },
  chooseMedia() {
    let that = this
    console.log('选择图片')
    wx.chooseMedia({
      count: 1,
      sizeType: ['original', 'compressed'],
      success: (res) => {
        console.log('图片选择成功res', res)
        this.setData({
          imgSrc: res.tempFiles[0].tempFilePath
        })
        wx.getImageInfo({
          src: res.tempFiles[0].tempFilePath,
          success: (res) => {
            console.log('获取图片信息', res)
            if (res.width > 1920 || res.height > 1920) {
              // console.log('开始canvas')
              // const ctx = wx.createCanvasContext('myCanvas')
              // ctx.drawImage(res.path, 0, 0)
              // ctx.draw(wx.canvasToTempFilePath())

              /* 压缩图片 */
              wx.compressImage({
                src: res.path,
                quality: 2,
                success: (res) => {
                  console.log('压缩成功res: ', res)
                  this.setData({
                    imgSrc: res.tempFilePath
                  })
                  wx.getImageInfo({
                    src: res.tempFilePath,
                    success: (res) => {
                      console.log('压缩后图片res: ', res)
                      wx.saveImageToPhotosAlbum({
                        filePath: res.path,
                        success: (res) => {
                          console.log('保存图片: ', res)
                        }
                      })
                    }
                  })
                }
              })
            }
          }
        })
      }
    })
  }
})
