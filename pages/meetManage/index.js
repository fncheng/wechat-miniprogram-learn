// pages/meetManage/index.js
import dayjs from 'dayjs'
import {
  getMeetingList,
  getVisitList,
  setMeetingFeedback,
} from '../../api/meetingManage'
import { getConfigList } from '../../api/common'
import { getCheckboxList } from '../../utils/common'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 0,
    searchString: '123',
    test: {
      searchString: '111',
    },
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
    cbx_meetingExecute: [], // 会议中执行清单
    meetingExecuteList: [], // 会议中执行清单菜单列表
    pd_idea_show: false,
    /** 会议反馈 */
    actualLaborCost: 100, // 实际劳务费用
    actualMealsCost: 1000, // 实际餐费
    meetingFeedback: {
      actualMeetingTime: '', // 实际会议时间
      meetingExecutorBillIds: '', // 会中执行清单ids
      meetingExecutorBillNames: '', // 会中执行清单s
      actualJoinMeetingPeopleIds: '', // 实际参会人员ids
      actualJoinMeetingPeopleNames: '', // 实际参会人员s
    },
    planMeetingPList_show: false,
    addMeetingPList_show: false,
    cbx_planList: [], // 计划参会者checkbox
    planMeetingPeopleList: [], // 计划参会者名单
  },
  onClose() {
    // this.setData({ show: false })
  },
  onChangeSearch(e) {
    console.log(e)
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
      cbx_meetingExecute: [],
    })
  },
  /**
   * 提交会议执行反馈
   */
  async confrimMeetingFeedback() {
    let date = this.data.currentDate.split('-').join('')
    let checkboxList = this.data.cbx_meetingExecute.map((item) =>
      JSON.parse(item)
    )
    console.log(checkboxList)
    let ids = checkboxList.map((item) => item.id).join()
    let names = checkboxList.map((item) => item.value).join()
    this.setData({
      ['meetingFeedback.actualMeetingTime']: date,
      ['meetingFeedback.meetingExecutorBillIds']: ids,
      ['meetingFeedback.meetingExecutorBillNames']: names,
      ['meetingFeedback.actualLaborCost']: Number(this.data.actualLaborCost),
      ['meetingFeedback.actualMealsCost']: Number(this.data.actualMealsCost),
    })
    this.setData({
      feedback_mdoal_show: false,
    })
    // let res = await setMeetingFeedback(this.data.meetingFeedback)
  },
  cancelMeetingFeedback() {
    this.setData({
      feedback_mdoal_show: false,
    })
  },
  /**
   * 修改会议实际时间
   */
  onChangeDate(e) {
    this.setData({
      currentDate: e.detail.value,
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
   * 打开计划参会者名单dialog
   */
  onPlanMeetingPeople() {
    this.setData({
      planMeetingPList_show: true,
    })
  },
  /**
   * 新增参会者名单dialog
   */
  onAddMeetingPeople() {
    this.setData({
      addMeetingPList_show: true,
    })
  },
  /**
   * 计划参会者名单
   */
  onChangeMeetingPeople(e) {
    this.setData({
      cbx_planList: e.detail,
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
    let list = await getCheckboxList('MEETING_LISTING')
    this.setData({
      meetingExecuteList: list,
    })
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
