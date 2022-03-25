// pages/patientPotential/index.js
import dayjs from 'dayjs'
import { getPdList } from '../../api/common'
import {
  addCustomerInfo,
  addPotentialInfo,
  getCompeList
} from '../../api/patientPotential'
import { getCheckboxList } from '../../utils/common'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentDate: dayjs().format('YYYY-MM'),
    sex_picker_show: false,
    sex_options: [{ name: '男' }, { name: '女' }],
    patientPot_sheet_show: false, // 新客户潜力信息弹窗
    isPatientUpdateDaily: false,
    hospitalName: '',
    deptName: '请选择科室',
    deptNames: [],
    deptNamesObjArray: [],
    product: '请选择产品',
    products: [],
    productsObjArray: [],
    customerName: '',
    phone: '',
    addQuery: {
      hospitalName: '', // 客户所属医院名称
      deptName: '', // 客户所属科室名称
      customerName: '', // 客户名称
      sex: 1, // 性别(1男，0女)
      productId: 100, // 产品id
      positionTitleId: 10003, // 职称id
      phone: '', // 客户手机号
      admPositionId: 1003, // 行政职务id
    },
    jobTitles: [], // 职称
    jobTitle: '请选择职称',
    jobTilesObjArray: [], // 用于存储职称的key-value对
    admPosition: '请选择行政职务',
    admPositions: [],
    admPositionObjArray: [], // 用于存储行政职务的key-value对
    /** 以下是潜力相关 */
    outpatientNum: null,
    dayOutpatientNum: null,
    outpatientEhRate: null,
    againPeriod: null,
    bedNum: null,
    monthBedNum: null, // 月度床位周转次数
    inpatientEhRate: null, // 住院高血压患者比例
    followPeriodNum: null, // 随访周期(周)
    potentialValue: null, // 病例管理潜力
    competitionOne: '请选择竞品信息', // 竞品1
    competitionTwo: '请选择竞品信息', // 竞品2
    competitionThree: '请选择竞品信息', // 竞品3
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
      competitionOne: '', // 竞品1
      competitionTwo: '', // 竞品2
      competitionThree: '', // 竞品3
      priceOne: 30, // 价格1
      priceTwo: 40, // 价格2
      priceThree: 50, // 价格3
    },
    drugNameList: [], // 竞品信息
    drugNames: [], // 竞品信息名称集合
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
      ['addQuery.sex']: sexid,
    })
  },
  /**
   * 完成选择科室
   */
  onChangeDept(e) {
    console.log('设置科室', this.data.deptNames[e.detail.value])
    this.setData({
      deptName: this.data.deptNames[e.detail.value],
    })
  },
  /**
   * 完成选择产品
   */
  onChangeProduct(e) {
    console.log('设置产品', this.data.products[e.detail.value])
    this.setData({
      product: this.data.products[e.detail.value],
    })
  },
  /**
   * 完成选择职称
   * @param {*} e
   */
  onChangeJobTitle(e) {
    console.log('设置职称', this.data.jobTitles[e.detail.value])
    this.setData({
      jobTitle: this.data.jobTitles[e.detail.value],
    })
  },
  /**
   * 完成选择行政职务
   */
  onChangeAdmPos(e) {
    console.log('设置行政职务', this.data.admPositions[e.detail.value])
    this.setData({
      admPosition: this.data.admPositions[e.detail.value],
    })
  },
  /**
   * 设置每日病例更新医生
   */
  onChangeUpdateDaily(e) {
    this.setData({
      isPatientUpdateDaily: e.detail,
    })
  },
  /**
   * 新客户潜力信息维护
   */
  async addPatientPot() {
    this.setData({
      patientPot_sheet_show: true,
    })
    // 获取竞品信息列表
    let res = await getCompeList()
    if (res.data.code === 200) {
      let names = res.data.data.map((item) => item.genericDrugName)
      this.setData({
        drugNameList: res.data.data,
        drugNames: names,
      })
    }
  },
  addPatientPot_cancel() {
    this.setData({
      patientPot_sheet_show: false,
    })
  },
  /**
   * 潜力信息月份
   */
  onChangeMonth(e) {
    this.setData({
      currentDate: e.detail.value,
    })
  },
  /**
   * 随访周期失焦，即潜力信息输入完，计算病例管理潜力
   * 门诊天数*日门诊量*高血压患者比例*复诊周期）+（床位数*月度床位周转次数*高血压患者比例*随访周期）/4
   */
  onBlurField(e) {
    console.log(e)
    let potentialValue =
      (this.data.potentialValue *
        this.data.dayOutpatientNum *
        this.data.outpatientEhRate *
        this.data.againPeriod +
        this.data.bedNum *
          this.data.monthBedNum *
          this.data.inpatientEhRate *
          this.data.followPeriodNum) /
      4
    this.setData({
      potentialValue,
    })
  },
  /**
   * 选择竞品信息
   */
  onChangeCompeOne(e) {
    console.log('竞品信息1', this.data.drugNames[e.detail.value])
    this.setData({
      competitionOne: this.data.drugNames[e.detail.value],
    })
  },
  onChangeCompeTwo(e) {
    console.log('竞品信息2', this.data.drugNames[e.detail.value])
    this.setData({
      competitionTwo: this.data.drugNames[e.detail.value],
    })
  },
  onChangeCompeThree(e) {
    console.log('竞品信息3', this.data.drugNames[e.detail.value])
    this.setData({
      competitionThree: this.data.drugNames[e.detail.value],
    })
  },
  /**
   * 确认新客户潜力信息
   */
  addPatientPot_confirm() {
    this.setData({
      patientPot_sheet_show: false,
      ['patientPotInfo.potentialMonth']: this.data.currentDate, // 潜力月份
      ['patientPotInfo.outpatientNum']: this.data.outpatientNum, // 门诊天数
      ['patientPotInfo.dayOutpatientNum']: this.data.dayOutpatientNum, // 日门诊量
      ['patientPotInfo.outpatientEhRate']: this.data.outpatientEhRate, // 门诊高血压患者比例
      ['patientPotInfo.againPeriod']: this.data.againPeriod, // 复诊周期(周)
      ['patientPotInfo.bedNum']: this.data.bedNum, // 床位数
      ['patientPotInfo.monthBedNum']: this.data.monthBedNum, // 月度床位周转次数
      ['patientPotInfo.inpatientEhRate']: this.data.inpatientEhRate, // 住院高血压患者比例
      ['patientPotInfo.followPeriodNum']: this.data.followPeriodNum, // 随访周期(周)
      ['patientPotInfo.potentialValue']: this.data.potentialValue, // 病例管理潜力
      ['patientPotInfo.competitionOne']: this.data.competitionOne, // 竞品1
      ['patientPotInfo.competitionTwo']: this.data.competitionTwo, // 竞品2
      ['patientPotInfo.competitionThree']: this.data.competitionThree, // 竞品3
    })
  },
  /**
   * 提交新增客户
   */
  async submitPatientPot() {
    /** 提交之前先setData表单 */
    this.setData({
      ['addQuery.hospitalName']: this.data.hospitalName, // 医院名称
      ['addQuery.deptName']: this.data.deptNamesObjArray[this.data.deptName]
        ?.id, // 科室id
      ['addQuery.customerName']: this.data.customerName, // 客户姓名
      ['addQuery.phone']: this.data.phone, // 客户手机号
      ['addQuery.admPositionId']: this.data.admPositionObjArray[
        this.data.admPosition
      ]?.id, // 行政职务id
      ['addQuery.positionTitleId']: this.data.jobTilesObjArray[
        this.data.jobTitle
      ]?.id, // 职称id
      ['addQuery.patientCaseMark']: this.data.isPatientUpdateDaily ? '1' : '0', // 每日病例更新标识
    })
    let req = { ...this.data.addQuery, potentialInfo: this.data.potentialValue }
    let res = await addCustomerInfo(req)
    if (res.data.code === 200) {
      // ...
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    /** 获取下拉框数据 */
    let jobTilesObjArray = await getCheckboxList('POSITION_TITLE')
    let jobTitles = jobTilesObjArray.map((item) => item.value)
    let admPositionObjArray = await getCheckboxList('ADMINISTRATIVE_POST')
    let admPositions = admPositionObjArray.map((item) => item.value)
    let deptNamesObjArray = await getCheckboxList('DEPT')
    let deptNames = deptNamesObjArray.map((item) => item.value)
    let products,
      productsObjArray = []
    let res = await getPdList()
    if (res.data.code === 200) {
      products = res.data.data.map((item) => item.name)
      productsObjArray = res.data.data.map((item) => ({
        id: item.id,
        value: item.name,
      }))
    }
    this.setData({
      jobTitles: jobTitles,
      jobTilesObjArray: jobTilesObjArray,
      admPositions,
      admPositionObjArray,
      deptNames,
      deptNamesObjArray,
      products,
      productsObjArray,
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
