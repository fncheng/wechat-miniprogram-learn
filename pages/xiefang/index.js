import { getMyPlanList, getSubPlanList, createXfPlan } from '../../api/xiefang'
import { getCheckboxList } from '../../utils/common'
// pages/xiefang/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeTab: '0',
    show: true,
    cbx_fudao: [], // 辅导列
    create_xf_show: false, // 创建协访计划表单
    xf_target_show: false, // 协访目的弹框
    xf_result_show: false, // 协访结果弹框
    myPlanList: [], // 协访计划列表
    subPlanList: [], // 下属的拜访计划
    /** 拜访计划详情 */
    bfPlanInfo: {
      hospitalName: '上海市第六人民医院',
      productName: '一叶',
      potential: 960,
      nowCase: 5,
      goalCase: 30,
      planStartTime: '2022-02-22 11:00:00',
    },
    createXfQuery: {
      hospitalName: '', // 医院名称
      productName: '', // 产品名称
      potential: 100, // 病例潜力
      nowCase: 100, // 目前病例
      goalCase: 100, // 目标病例
      planStartTime: '', // 拜访计划开始时间
    },
    fudao_cbx_list: [],
    check_cbx_list: [],
    resolveProblem_cbx_list: [],
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
  /**
   * @description: 创建协访计划，打开弹框，将拜访计划详情的数据传入modal
   */
  async createXf(e) {
    console.log(e)
    this.setData({
      create_xf_show: true,
    })
  },
  cancelXfPlan() {
    this.setData({
      create_xf_show: false,
    })
  },
  /**
   * 确认创建拜访计划
   */
  async confrimXfPlan() {
    let res = await createXfPlan(this.data.createXfQuery)
    if (res.data.code === 200) {
      this.setData({
        create_xf_show: false,
      })
    }
  },
  /**
   * @description: 协访目的
   */
  async setXfTarget() {
    this.setData({
      xf_target_show: true,
    })
    let list = await getCheckboxList('SYNERGY_TUTORIAL')
    let list2 = await getCheckboxList('SYNERGY_CHECK')
    let list3 = await getCheckboxList('SYNERGY_PROBLEM')
    this.setData({
      fudao_cbx_list: list,
      check_cbx_list: list2,
      resolveProblem_cbx_list: list3,
    })
  },
  /**
   * @description: 跳转至协访结果
   */
  setXfResult() {
    wx.navigateTo({
      url: '/pages/xiefangResult/index',
    })
  },
  /**
   * 获取我的协访计划列表
   */
  async getXfListFn() {
    let res = await getPlanList()
    if (res.data.code === 200) {
      this.setData({
        myPlanList: res.data.data,
      })
    }
  },
  /**
   * 获取下属的协访计划列表
   */
  async getSubPlanListFn() {
    let res = await getSubPlanList()
    if (res.data.code === 200) {
      this.setData({
        subPlanList: res.data.data,
      })
    }
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
