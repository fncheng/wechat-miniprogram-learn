const config = require('../config/index')
import qs from 'querystring'
const BASE_URL = config.BASE_URL
/**
 * @description: 发起请求
 * @param {object} Obj
 * @param {string} Obj.url
 * @param {any} Obj.data
 * @param {string} Obj.method
 * @param {string=} Obj.contentType - '123132'
 * @param {boolean} Obj.showLoading default=>false
 * @return {*}
 */
try {
  wx.setStorageSync(
    'token',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzODYiLCJ1c2VyTmFtZSI6IuiRo-aIkCIsImV4cCI6MTY0ODYwMzQ0NSwibmJmIjoxNjQ4MTcxNDQ1LCJqdGkiOiIxY2NjZjkzM2Q0OGNjYzQ2ZDJlNWI4NjQwYWM4MjRkOCJ9.6-O365lXg5SYgO7rJcqL-U-2ZzQbP-jKxWKrUXliSqw'
  )
  wx.setStorageSync('traceId', '876fb85b3d75-468c-8ac2-7c860a5ee764')
} catch (err) {
  console.log('err: ', err)
}

export default function ({
  url,
  data,
  method,
  contentType = 'application/json',
  showLoading = false,
}) {
  let urlstring = ''
  // 表单查询
  if (contentType === 'application/x-www-form-urlencoded') {
    urlstring = `${BASE_URL}${url}?${qs.stringify(data)}`
  } else urlstring = `${BASE_URL}${url}`
  // console.log('urlstring: ', urlstring);
  let token = ''
  let traceId = ''
  try {
    token = wx.getStorageSync('token')
    traceId = wx.getStorageSync('traceId')
    console.log('token: ', token)
  } catch (err) {
    console.log('e: ', err)
  }
  token = token

  return new Promise((resolve, reject) => {
    showLoading && wx.showLoading({ title: '加载中', mask: true })
    wx.request({
      url: urlstring,
      header: {
        'content-type': contentType,
        deviceTag: 'app', // 不加deviceTag token无效
        token: token,
        traceId: traceId,
      },
      data: contentType === 'application/json' ? data : '',
      method,
      success(res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          resolve(res)
        } else if (res.data.code === 404 || res.data.code === 500) {
          wx.showModal({
            title: '提示',
            content: res.data.msg || '网络错误，请稍后重试',
            showCancel: false,
          })
        } else if (res.data.code === 100001) {
          wx.showModal({
            title: '提示',
            content: '登录失效，请重新登录',
            showCancel: false,
            success() {
              wx.redirectTo({ url: '/pages/login/index' })
            },
          })
        } else if (res.data.code === 100002 || res.data.code === 100004) {
          wx.showModal({
            title: '提示',
            content: '请先登录',
            showCancel: false,
            success() {
              wx.redirectTo({ url: '/pages/login/index' })
            },
          })
        }
      },
      fail(err) {
        reject(err)
      },
    })
  })
}
