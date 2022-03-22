// pages/xiefang/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeTab: '1',
    show: true,
    cbx_fudao: [], // 辅导列
    create_xf_show: false, // 创建协访计划表单
    xf_target_show: false, // 协访目的弹框
    createXfQuery: {
      hospitalName: '', // 医院名称
      productName: '', // 产品名称
      potential: 100, // 病例潜力
      nowCase: 100, // 目前病例
      goalCase: 100, // 目标病例
      planStartTime: '', // 拜访计划开始时间
    },
  },
  /**
   * @description: 修改tab栏
   */
  onChangeTab(e) {
    this.setData({
      activeTab: e.detail.name,
    })
  },
  onChange(e) {
    this.setData({
      cbx_fudao: e.detail,
    })
  },
  createXf() {
    this.setData({
      create_xf_show: true,
    })
  },
  cancelXfPlan() {
    this.setData({
      create_xf_show: false,
    })
  },
  confrimXfPlan() {
    this.setData({
      create_xf_show: false,
    })
  },
  /**
   * @description: 协访目的
   */
  setXfTarget() {
    this.setData({
      xf_target_show: true,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
})
