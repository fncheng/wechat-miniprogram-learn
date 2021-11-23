import * as echarts from '../../miniprogram_npm/ec-canvas/echarts';

const app = getApp();
console.log('app: ', app);

var option = {}
function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  console.log('this',this);

  chart.setOption(option);
  return chart;
}

Component({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  properties:{
    option: Object
  },
  attached() {
    console.log('pie',this.data);
    option = this.properties.option
    console.log('option', option);
  },
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {
  }
});
