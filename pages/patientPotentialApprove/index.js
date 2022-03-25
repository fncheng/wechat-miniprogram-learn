import { potApprove, getApproveList } from '../../api/patientPotApprove'

// pages/patientPotentialApprove/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: '1',
    approveList: [
      {
        hospitalName: '复旦大学附属华山医院(依叶)', // 医院名称
        approvalStatus: '1', // 审批状态 1已提交;2已审核
        delegateName: '李名', // 销售代表
        customerName: '王三', // 客户名称
        createdAt: '2022-03-22', // 提交时间
        potentialMonth: '2022-03', // 潜力月份
        outpatientNum: 100, // 门诊天数
        dayOutpatientNum: 123, // 日门诊量
        outpatientEhRate: 0.45, // 门诊高血压患者比例
        againPeriod: 2, // 复诊周期(周)
        bedNum: 8, // 床位数
        monthBedNum: 33, // 月度床位周转次数
        inpatientEhRate: 0.22, // 住院高血压患者比例
        followPeriodNum: 2, // 随访周期(周)
        potentialValue: 111, // 病例管理潜力
        competitionOne: '替米沙坦氢氯噻嗪片1', // 竞品1
        competitionTwo: '替米沙坦氢氯噻嗪片2', // 竞品2
        competitionThree: '替米沙坦氢氯噻嗪片3', // 竞品3
      },
    ], // 审批列表
    /** 以下是潜力相关 */
    patientPot_sheet_show: false, // 新客户潜力信息弹窗
    outpatientNum: null,
    dayOutpatientNum: null,
    outpatientEhRate: null,
    againPeriod: null,
    bedNum: null,
    monthBedNum: null, // 月度床位周转次数
    inpatientEhRate: null, // 住院高血压患者比例
    followPeriodNum: null, // 随访周期(周)
    potentialValue: null, // 病例管理潜力
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
  async onChangeTab(e) {
    console.log(e)
    let activeTab = e.detail.name
    this.setData({
      active: activeTab,
    })
    await this.getApproveListFn()
  },
  /**
   * 根据审批状态、医院、医生及产品名称查询潜力信息审批列表
   * @param {string} approvalStatus 审核状态
   * @param {string} searchName 搜索名称
   * @returns {Promise<Array>}
   */
  async getApproveListFn(approvalStatus, searchName) {
    approvalStatus = this.data.active
    let res = await getApproveList({
      approvalStatus,
      searchName,
    })
    if (res.data.code === 200) {
      this.setData({
        approveList: res.data.data,
      })
    }
  },
  /**
   * 点击审批
   */
  onApprovePot(e) {
    console.log(e)
    this.setData({
      patientPot_sheet_show: true,
      patientPotInfo: e.currentTarget.dataset.item,
    })
  },
  onApproveCancel() {
    this.setData({
      patientPot_sheet_show: false,
    })
  },
  /**
   * 审批通过
   */
  async onApproveConfirm() {
    let res = await potApprove({
      recordId,
    })
    if (res.data.code === 200) {
      this.setData({
        patientPot_sheet_show: false,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await this.getApproveListFn('', '')
  },

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
