import * as echarts from '../../miniprogram_npm/ec-canvas/echarts'
const computedBehavior = require('miniprogram-computed').behavior

const app = getApp()
console.log('app: ', app)

// var option = {}
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
      radius: ['10%', '40%'],
      data: []
    }
  ]
}
var chart = null
function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  })
  canvas.setChart(chart)
  chart.setOption(option)
  return chart
}

Component({
  behaviors: [computedBehavior],
  properties: {
    data: Array,
    a: Number
  },
  attached() {
    // option.series[0].data = this.properties.data
    // console.log('option', option)
  },
  data: {
    ec: {
      onInit: initChart
    },
    b: 2,
    num: 0
  },
  watch: {
    'a,b'(a, b) {
      console.log('a,b', a, b)
      this.setData({
        sum: a + b
      })
    },
    data(newVal) {
      console.log('newVal', newVal)
      option.series[0].data = this.properties.data
      // chart.setOption(option)
      chart?.setOption(option)
    }
  },

  onReady() {},
})
