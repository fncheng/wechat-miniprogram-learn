// pages/patientPotential/index.js
import dayjs from 'dayjs'
import { addCustomerInfo, addPotentialInfo } from '../../api/patientPotential'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentDate: dayjs().format('YYYY-MM-DD'),
    sex_picker_show: false,
    sex_options: [{ name: '男' }, { name: '女' }],
    patientPot_sheet_show: true, // 新客户潜力信息弹窗
    patientPotQuery: {
      hospitalName: '', // 客户所属医院名称
      deptName: '', // 客户所属科室名称
      customerName: '', // 客户名称
      sex: 1, // 性别(1男，0女)
      productId: 100, // 产品id
      positionTitleId: 10003, // 职称id
      phone: '', // 客户手机号
      admPositionId: 1003, // 行政职务id
    },
    patientPotInfo: {
      outpatientNum: 10, // 门诊天数
      dayOutpatientNum: 123, // 日门诊量
      outpatientEhRate: 0.45, // 门诊高血压患者比例
      againPeriod: 2, // 复诊周期(周)
      bedNum: 8, // 床位数
      monthBedNum: 33, // 月度床位周转次数
      inpatientEhRate: 0.22, // 住院高血压患者比例
      followPeriodNum: 2, // 随访周期(周)
      potentialValue: 111, // 病例管理潜力
      competitionOne: '替米沙坦氢氯噻嗪片', // 竞品1
      competitionTwo: '替米沙坦氢氯噻嗪片', // 竞品2
      competitionThree: '替米沙坦氢氯噻嗪片', // 竞品3
      priceOne: 30, // 价格1
      priceTwo: 40, // 价格2
      priceThree: 50, // 价格3
    },
  },
  /**
   * 修改性别弹窗显示
   */
  changeSex(e) {
    this.setData({ sex_picker_show: true })
  },
  // 设置性别
  onSexSelect(e) {
    let sexid = e.detail.name === '男' ? 1 : 0
    this.setData({
      sex_picker_show: false,
      ['patientPotQuery.sex']: sexid,
    })
  },
  /**
   * 新客户潜力信息维护
   */
  addPatientPot() {
    this.setData({
      patientPot_sheet_show: true,
    })
  },
  addPatientPot_cancel() {
    this.setData({
      patientPot_sheet_show: false,
    })
  },
  addPatientPot_confirm() {
    this.setData({
      patientPot_sheet_show: false,
    })
  },
  /**
   * 提交新增客户
   */
  async submitPatientPot() {
    // let res = await addCustomerInfo(this.data.patientPotQuery)
    // if (res.data.code===200) {
    //   // ...
    // }
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
