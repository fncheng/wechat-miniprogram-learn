// pages/vant/vant.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  }
})