import * as echarts from '../../miniprogram_npm/ec-canvas/echarts'
const computedBehavior = require('miniprogram-computed').behavior

const app = getApp()

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  })
  canvas.setChart(chart)

  var option = {
    backgroundColor: '#ffffff',
    series: [
      {
        label: {
          // normal: {
          fontSize: 14
          // }
        },
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['20%', '40%'],
        data: [
          {
            value: 55,
            name: '北京'
          },
          {
            value: 20,
            name: '武汉'
          },
          {
            value: 10,
            name: '杭州'
          },
          {
            value: 20,
            name: '广州'
          },
          {
            value: 38,
            name: '上海'
          }
        ]
      }
    ]
  }

  chart.setOption(option)
  return chart
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () {},
      fail: function () {}
    }
  },
  behaviors: [computedBehavior],
  data: {
    ec: {
      onInit: initChart
    },
    pieData: [
      {
        value: 55,
        name: '北京'
      },
      {
        value: 20,
        name: '武汉'
      },
      {
        value: 10,
        name: '杭州'
      },
      {
        value: 20,
        name: '广州'
      },
      {
        value: 38,
        name: '上海'
      }
    ],
    a: 1,
    b: 2,
    sum: 0
  },
  // watch: {
  //   // watch只能拿到监听的值，newVal
  //   'a,b'(a, b) {
  //     console.log('a,b', a, b)
  //     this.setData({
  //       sum: a + b
  //     })
  //   }
  // },

  onReady() {
  },
  onTap() {
    this.setData({
      a: 2,
      b: 3
    })
    this.setData({
      pieData: [
        {
          value: 220,
          name: '北京'
        },
        {
          value: 20,
          name: '武汉'
        },
        {
          value: 10,
          name: '杭州'
        },
        {
          value: 20,
          name: '广州'
        },
        {
          value: 38,
          name: '上海'
        }
      ]
    })
  }
})
