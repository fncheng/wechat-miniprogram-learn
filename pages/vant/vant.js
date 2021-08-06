// pages/vant/vant.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // show: false,
    minDate: new Date().getTime(),
    maxDate: new Date(2023, 10, 1).getTime(),
    currentDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } 
      if (type === 'month') {
        return `${value}月`;
      }
      if (type==='day') {
        return `${value}日`;
      }
      return value;
    },
    tips: '请稍后',
    show: true,
    animated: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options: ', options);
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', {data: 'acceptDataFromOpenedPage'});
    eventChannel.emit('someEvent', {data: 'someEvent'});
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log(data)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.timer = setInterval(() => {
      this.setData({
        show: !this.data.show
      })
    }, 2000)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.timer)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  showPopup() {
    console.log('show');
    this.setData({ show: true });
    // wx.showToast({
    //   title: '成功',
    //   icon: 'success',
    //   duration: 2000
    // })
  },

  onClose() {
    console.log('close');
    this.setData({ show: false });
  },
  onInput(event) {
    console.log('event: ', event);
    this.setData({
      currentDate: event.detail,
    });
  },
  bindDateChange(e){
    console.log(123);
    console.log('e: ', e);
  },

  bindClick(e){
    console.log('e: ', e);
    wx.vibrateShort({
      type:'heavy',
      success: (res)=>{
        console.log('振动成功',res);
      },
      fail(err){
        console.log('振动失败',err);
      }
    })
  },
  bindChange(e){
    console.log(123);
  },
  bindLoading(e){
    console.log(e);

  }
})