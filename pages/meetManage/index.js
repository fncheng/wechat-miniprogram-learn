// pages/meetManage/index.js
import dayjs from 'dayjs'
import { getMeetingList, getVisitList } from '../../api/meetingManage'
import { getConfigList } from '../../api/getConfigList'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 0,
    show: true,
    feedback_mdoal_show: false,
    actions: [
      {
        name: '选项',
      },
      {
        name: '选项',
      },
      {
        name: '选项',
        subname: '描述信息',
        openType: 'share',
      },
    ],
    currentDate: dayjs().format('YYYY-MM-DD'),
    currentTime: dayjs().format('HH:mm'),
    radio: '1',
    meetingList: [
      {
        hospitalName: '复旦大学附属华山医院1', // 医院名称
        deptNames: '心内科', // 科室名称
        customerName: '张主任', // 客户姓名
        meetingStatus: 0, // 会议状态(1已申请，2已审批，3已反馈，0已拒绝)
        meetingTypeName: '科室会1', // 会议类型
        meetingPlanTime: '3月3日', // 会议计划时间
      },
      {
        hospitalName: '复旦大学附属华山医院2', // 医院名称
        deptNames: '心内科', // 科室名称
        customerName: '张主任', // 客户姓名
        meetingStatus: 2, // 会议状态(1已申请，2已审批，3已反馈，0已拒绝)
        meetingTypeName: '科室会1', // 会议类型
        meetingPlanTime: '3月3日', // 会议计划时间
      },
    ],
    meetingStatus: {
      0: '已拒绝',
      1: '已申请',
      2: '已审批',
      3: '已反馈',
    },
    meeting_execute_show: false,
    cbx_meetingExecute: ['1', '2'], // 会议中执行清单
    meetingExecuteList: [], // 会议中执行清单菜单列表
    pd_idea_show: false,
  },
  onClose() {
    // this.setData({ show: false })
  },

  onSelect(event) {
    // console.log(event.detail)
  },
  /**
   * @description: 执行反馈
   * @param {*}
   * @return {*}
   */
  onFeedback() {
    this.setData({
      feedback_mdoal_show: true,
    })
  },
  confrimMeetingFeedback() {
    this.setData({
      feedback_mdoal_show: false,
    })
  },
  cancelMeetingFeedback() {
    this.setData({
      feedback_mdoal_show: false,
    })
  },
  /**
   * @description: 显示会中执行清单action-sheet
   * @param {*}
   * @return {*}
   */
  setMeetingInventory() {
    console.log('input')
    this.setData({
      meeting_execute_show: true,
    })
  },
  confrimMeetingInventory() {
    this.setData({
      meeting_execute_show: false,
    })
  },
  cancelMeetingInventory() {
    this.setData({
      meeting_execute_show: false,
    })
  },
  checkMeetingInventory(e) {
    console.log(e)
    this.setData({
      cbx_meetingExecute: e.detail,
    })
  },
  /**
   * @description: 设置产品观念
   * @param {*}
   * @return {*}
   */
  setPdIdea() {
    this.setData({
      pd_idea_show: true,
    })
  },
  confrimPdIdea() {
    this.setData({
      pd_idea_show: false,
    })
  },
  cancelPdIdea() {
    this.setData({
      pd_idea_show: false,
    })
  },
  getMeetingListFn() {
    // let res = await getMeetingList({
    //   currPage: 0,
    //   meetingStatus: 0, // 会议状态(1已申请，2已审批，3已反馈，0已拒绝)
    //   pageSize: 0,
    //   searchCondition: '', // 医院，医生，产品模糊搜索字段
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    wx.setStorageSync('1a', 123)
    // await this.getMeetingListFn()
    // let res = await getVisitList({
    //   currPage: 1,
    //   pageSize: 10,
    // })
    let res = await getConfigList({ configName: 'MEETING_LISTING' })
    if (res.data.code === 200) {
      let meetingExecuteList = res.data.data.map((item) => ({
        id: item.id,
        value: item.configValue,
      }))
      this.setData({
        meetingExecuteList,
      })
    }
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
