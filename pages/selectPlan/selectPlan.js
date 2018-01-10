// pages/selectPlan/selectPlan.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   * basicExamineItems - 基础套餐
   * luxuryExamineItems - 豪华套餐
   * allExamineItems - 顶级套餐
   */
  data: {
    curIndex: 0,
    subtotal: 924,
    count: 1,
    finalTotal:831.6.toFixed(1),
    isChecked: true,
    condition: 0,
    discount1: 0.9,
    discount2: 0.8,
    items: [
      { id: 0, name: '基础套餐', checked: 'true'},
      { id: 1, name: '豪华套餐' },
      { id: 2, name: '顶级套餐' }
    ],
    listSoil: [
      [
        { abbr: 'water',display: "水分", price: 20 },
        { abbr: 'PH',display: "pH", price: 24 },
        { abbr: 'EC',display: "电导率（EC)", price: 24 },
        { abbr: 'pb',display: "容重", price: 24 },
        { abbr: 'sw',display: "比重", price: 24 },
        { abbr: 'som',display: "有机质", price: 40 },
        { abbr: 'NO3_',display: "硝态氮(NO3-)", price: 50 },
        { abbr: 'NH4',display: "铵态氮(NH4+)", price: 50 },
        { abbr: 'P',display: "有效磷(P)", price: 50 },
        { abbr: 'K',display: "有效钾(K)", price: 60 },
        { abbr: 'S',display: "有效硫(S)", price: 50 },
        { abbr: 'Ca',display: "交换性钙含量(Ca)", price: 50 },
        { abbr: 'Mg',display: "交换性镁含量(Mg)", price: 50 }
      ],
      [
        { abbr: 'water',display: "水分", price: 20 },
        { abbr: 'PH',display: "pH", price: 24 },
        { abbr: 'EC',display: "电导率（EC)", price: 24 },
        { abbr: 'pb',display: "容重", price: 24 },
        { abbr: 'sw',display: "比重", price: 24 },
        { abbr: 'som',display: "有机质", price: 40 },
        { abbr: 'NO3_',display: "硝态氮(NO3-)", price: 50 },
        { abbr: 'NH4',display: "铵态氮(NH4+)", price: 50 },
        { abbr: 'P',display: "有效磷(P)", price: 50 },
        { abbr: 'K',display: "有效钾(K)", price: 60 },
        { abbr: 'S',display: "有效硫(S)", price: 50 },
        { abbr: 'Ca',display: "交换性钙含量(Ca)", price: 50 },
        { abbr: 'Mg',display: "交换性镁含量(Mg)", price: 50 },
        { abbr: 'B',display: "有效硼（B)", price: 70 },
        { abbr: 'Fe',display: "有效铁(Fe)", price: 70 },
        { abbr: 'Mn',display: "有效锰(Mn)", price: 70 },
        { abbr: 'Zn',display: "有效锌(Zn)", price: 70 },
        { abbr: 'Cu',display: "有效铜(Cu)", price: 70 },
        { abbr: 'Mo',display: "有效钼(Mo)", price: 80 }
      ],
      [
        { abbr: 'water',display: "水分", price: 20 },
        { abbr: 'PH',display: "pH", price: 24 },
        { abbr: 'EC',display: "电导率（EC)", price: 24 },
        { abbr: 'pb',display: "容重", price: 24 },
        { abbr: 'sw',display: "比重", price: 24 },
        { abbr: 'som',display: "有机质", price: 40 },
        { abbr: 'NO3_',display: "硝态氮(NO3-)", price: 50 },
        { abbr: 'NH4',display: "铵态氮(NH4+)", price: 50 },
        { abbr: 'P',display: "有效磷(P)", price: 50 },
        { abbr: 'K',display: "有效钾(K)", price: 60 },
        { abbr: 'S',display: "有效硫(S)", price: 50 },
        { abbr: 'Ca',display: "交换性钙含量(Ca)", price: 50 },
        { abbr: 'Mg',display: "交换性镁含量(Mg)", price: 50 },
        { abbr: 'B',display: "有效硼（B)", price: 70 },
        { abbr: 'Fe',display: "有效铁(Fe)", price: 70 },
        { abbr: 'Mn',display: "有效锰(Mn)", price: 70 },
        { abbr: 'Zn',display: "有效锌(Zn)", price: 70 },
        { abbr: 'Cu',display: "有效铜(Cu)", price: 70 },
        { abbr: 'Mo',display: "有效钼(Mo)", price: 80 },
        { abbr: 'Cl',display: "可溶性氯(Cl)", price: 50 },
        { abbr: 'Na',display: "交换性钠(Na)", price: 50 },
        { abbr: 'Si',display: "有效硅(Si)", price: 50 },
        { abbr: 'CO3',display: "碳酸根(CO3)", price: 40 },
        { abbr: 'HCO3_',display: "碳酸氢根(HCO3-）", price: 40 },
        { abbr: 'N',display: "全氮（N)", price: 50 },
        { abbr: 'aP',display: "全磷(P)", price: 60 }
      ]     
    ],
    listSubstrate:[
      [
        { abbr: 'PH',display: "pH", price: 24 },
        { abbr: 'EC',display: "电导率（EC）", price: 24 },
        { abbr: 'NO3_',display: "硝态氮(NO3-)", price: 50 },
        { abbr: 'NH4',display: "铵态氮(NH4+)", price: 50 },
        { abbr: 'P',display: "有效磷(P)", price: 50 },
        { abbr: 'K',display: "有效钾(K)", price: 60 },
        { abbr: 'S',display: "有效硫(S)", price: 50 },
        { abbr: 'Ca',display: "交换性钙含量(Ca)", price: 50 },
        { abbr: 'Mg',display: "交换性镁含量(Mg)", price: 50 }
      ],
      [
        { abbr: 'PH',display: "pH", price: 24 },
        { abbr: 'EC',display: "电导率（EC）", price: 24 },
        { abbr: 'NO3_',display: "硝态氮(NO3-)", price: 50 },
        { abbr: 'NH4',display: "铵态氮(NH4+)", price: 50 },
        { abbr: 'P',display: "有效磷(P)", price: 50 },
        { abbr: 'K',display: "有效钾(K)", price: 60 },
        { abbr: 'S',display: "有效硫(S)", price: 50 },
        { abbr: 'Ca',display: "交换性钙含量(Ca)", price: 50 },
        { abbr: 'Mg',display: "交换性镁含量(Mg)", price: 50 },
        { abbr: 'B',display: "有效硼（B)", price: 70 },
        { abbr: 'Fe',display: "有效铁(Fe)", price: 70 },
        { abbr: 'Mn',display: "有效锰(Mn)", price: 70 },
        { abbr: 'Zn',display: "有效锌(Zn)", price: 70 },
        { abbr: 'Cu',display: "有效铜(Cu)", price: 70 },
        { abbr: 'Mo',display: "有效钼(Mo)", price: 80 }
      ],
      [        
        { abbr: 'PH',display: "pH", price: 24 },
        { abbr: 'EC',display: "电导率（EC）", price: 24 },
        { abbr: 'NO3_',display: "硝态氮(NO3-)", price: 50 },
        { abbr: 'NH4',display: "铵态氮(NH4+)", price: 50 },
        { abbr: 'P',display: "有效磷(P)", price: 50 },
        { abbr: 'K',display: "有效钾(K)", price: 60 },
        { abbr: 'S',display: "有效硫(S)", price: 50 },
        { abbr: 'Ca',display: "交换性钙含量(Ca)", price: 50 },
        { abbr: 'Mg',display: "交换性镁含量(Mg)", price: 50 },
        { abbr: 'B',display: "有效硼（B)", price: 70 },
        { abbr: 'Fe',display: "有效铁(Fe)", price: 70 },
        { abbr: 'Mn',display: "有效锰(Mn)", price: 70 },
        { abbr: 'Zn',display: "有效锌(Zn)", price: 70 },
        { abbr: 'Cu',display: "有效铜(Cu)", price: 70 },
        { abbr: 'Mo',display: "有效钼(Mo)", price: 80 },
        { abbr: 'Cl',display: "可溶性氯(Cl)", price: 50 },
        { abbr: 'Na',display: "交换性钠(Na)", price: 50 },
        { abbr: 'Si',display: "可溶性硅(Si)", price: 50 },
        { abbr: 'CO3',display: "碳酸根(CO3)", price: 40 },
        { abbr: 'HCO3_',display: "碳酸氢根(HCO3-）", price: 40 }
      ]
    ],
    tip1: "检测指标低于2项加收20元/样的样本处理费",
    tip2: "选择任意套餐享9折优惠",
    tip3: "订单超过10个土样享8折优惠",
  },
  radioChange: function (e) {    
    console.log('radio发生change事件，携带value值为：', e.detail.value)  
    var index = e.detail.value 
    var arr1 = this.data.listSoil[index]
    var arr2 = this.data.listSubstrate[index]
    var arr = arr1.concat(arr2)
    var arrPrice = arr.map(x=>x.price).reduce((s,v)=>s+v,0)
    this.setData({
      curIndex: e.detail.value,
      subtotal: arrPrice ,
      count: 1,
      finalTotal: (arrPrice * this.data.discount1).toFixed(1),
      isChecked: true,
      condition: 0,
      discount1: 0.9,
      discount2: 0.8
    })
    console.log("arr:", arr)
    app.globalData.arrSoilitem = arr1.map(x => ({ abbr: x.abbr,display:x.display}))
    app.globalData.arrSubstritem = arr2.map(x => ({ abbr: x.abbr, display: x.display }))
    delete app.globalData.arrSoiltotal
    delete app.globalData.arrSubstrtotal
  },
  checkboxChangeSoil: function (e) {    
    var arrSoil = e.detail.value 
    console.log("checkboxChangeSoil:", arrSoil  )
    var arrSoilitem = arrSoil.map(x => x.split(" ")).map(x => ({ abbr: x[0], display: x[1] }))
    var arrSoiltotal = arrSoil.map(x => x.split(" ")).map(x => parseInt(x[2])).reduce((s, v) => s + v,0)
    console.log("arrSoilitem:", arrSoilitem)
    console.log("arrSoiltotal:", arrSoiltotal)

    var curindex = this.data.curIndex
    // 添加app全局数据供后面使用
    app.globalData.arrSoilitem = arrSoilitem
    app.globalData.arrSoiltotal = arrSoiltotal
    
    // 如果所选检测项目数等于套餐项目，打9折 ；小于套餐项目数，不打折；检测项目数小于等于2，加收20元/样    
    if (arrSoilitem.concat(app.globalData.arrSubstritem).length == this.data.listSoil[curindex].concat(this.data.listSubstrate[curindex]).length ){
      this.setData({ discount1: 0.9, condition: 0})
      if (app.globalData.arrSubstrtotal >= 0) {
        if (curindex == 0) {
          arrSoiltotal = arrSoiltotal + app.globalData.arrSubstrtotal
        }
        else if (curindex == 1) {
          arrSoiltotal = arrSoiltotal + app.globalData.arrSubstrtotal
        }
        else if (curindex == 2) {
          arrSoiltotal = arrSoiltotal + app.globalData.arrSubstrtotal
        }
      } else {
        if (curindex == 0) {
          arrSoiltotal = arrSoiltotal + 408
        }
        else if (curindex == 1) {
          arrSoiltotal = arrSoiltotal + 838
        }
        else if (curindex == 2) {
          arrSoiltotal = arrSoiltotal + 1068
        }
      }
      this.setData({ subtotal: arrSoiltotal, finalTotal: (arrSoiltotal * this.data.count * this.data.discount1).toFixed(1) })
    } else if (arrSoilitem.concat(app.globalData.arrSubstritem).length < this.data.listSoil[curindex].concat(this.data.listSubstrate[curindex]).length && arrSoilitem.concat(app.globalData.arrSubstritem).length > 2){
      this.setData({ discount1: 1 ,condition: 3})
      if (app.globalData.arrSubstrtotal >= 0) {
        if (curindex == 0) {
          arrSoiltotal = arrSoiltotal + app.globalData.arrSubstrtotal
        }
        else if (curindex == 1) {
          arrSoiltotal = arrSoiltotal + app.globalData.arrSubstrtotal
        }
        else if (curindex == 2) {
          arrSoiltotal = arrSoiltotal + app.globalData.arrSubstrtotal
        }
      } else {
        if (curindex == 0) {
          arrSoiltotal = arrSoiltotal + 408
        }
        else if (curindex == 1) {
          arrSoiltotal = arrSoiltotal + 838
        }
        else if (curindex == 2) {
          arrSoiltotal = arrSoiltotal + 1068
        }
      }
      this.setData({ subtotal: arrSoiltotal, finalTotal: (arrSoiltotal * this.data.count * this.data.discount1).toFixed(1) })
    } else if (arrSoilitem.concat(app.globalData.arrSubstritem).length <= 2 && arrSoilitem.concat(app.globalData.arrSubstritem).length >= 1) {// 检测项目数小于等于2，加收20元/样
      //console.log("arrSubstritem.length:", app.globalData.arrSubstritem.length)
      this.setData({ discount1: 1, condition: 2 })
      if (app.globalData.arrSubstrtotal >= 0) {
        if (curindex == 0) {
          arrSoiltotal = arrSoiltotal + app.globalData.arrSubstrtotal
        }
        else if (curindex == 1) {
          arrSoiltotal = arrSoiltotal + app.globalData.arrSubstrtotal
        }
        else if (curindex == 2) {
          arrSoiltotal = arrSoiltotal + app.globalData.arrSubstrtotal
        }
      } else {
        if (curindex == 0) {
          arrSoiltotal = arrSoiltotal + 408
        }
        else if (curindex == 1) {
          arrSoiltotal = arrSoiltotal + 838
        }
        else if (curindex == 2) {
          arrSoiltotal = arrSoiltotal + 1068
        }
      }
      
      arrSoiltotal =  arrSoiltotal +20
      this.setData({ subtotal: arrSoiltotal, finalTotal: (arrSoiltotal * this.data.count * this.data.discount1).toFixed(1) })
    } else if (arrSoiltotal == 0 && app.globalData.arrSubstrtotal == 0){
      this.setData({ subtotal: 0, finalTotal: 0})
    }      
    
  },
  checkboxChangeSubstrate: function (e) {
    console.log('checkboxChangeSubstrate：', e.detail.value)
    var arrSubstr = e.detail.value
    var arrSubstritem = arrSubstr.map(x => x.split(" ")).map(x => ({ abbr: x[0], display: x[1] }))
    var arrSubstrtotal = arrSubstr.map(x => x.split(" ")).map(x => parseInt(x[2])).reduce((s, v) => s + v, 0)
    console.log("arrSubstritem:", arrSubstritem)
    console.log("arrSubstrtotal:", arrSubstrtotal)
    // 下单的时候用到
    app.globalData.arrSubstritem = arrSubstritem
    app.globalData.arrSubstrtotal = arrSubstrtotal
    var curindex = this.data.curIndex
    if (arrSubstritem.concat(app.globalData.arrSoilitem).length == this.data.listSoil[curindex].concat(this.data.listSubstrate[curindex]).length) {
      this.setData({ discount1: 0.9, condition: 0 })
      if (app.globalData.arrSoiltotal >= 0) {
        if (curindex == 0) {
          arrSubstrtotal = arrSubstrtotal + app.globalData.arrSoiltotal
        }
        else if (curindex == 1) {
          arrSubstrtotal = arrSubstrtotal + app.globalData.arrSoiltotal
        }
        else if (curindex == 2) {
          arrSubstrtotal = arrSubstrtotal + app.globalData.arrSoiltotal
        }
      } else {
        if (curindex == 0) {
          arrSubstrtotal = arrSubstrtotal + 516
        }
        else if (curindex == 1) {
          arrSubstrtotal = arrSubstrtotal + 946
        }
        else if (curindex == 2) {
          arrSubstrtotal = arrSubstrtotal + 1286
        }
      }
      this.setData({ subtotal: arrSubstrtotal, finalTotal: (arrSubstrtotal * this.data.count * this.data.discount1).toFixed(1) })
    } else if (arrSubstritem.concat(app.globalData.arrSoilitem).length < this.data.listSoil[curindex].concat(this.data.listSubstrate[curindex]).length && arrSubstritem.concat(app.globalData.arrSoilitem).length > 2) {
      this.setData({ discount1: 1, condition: 3 })
      if (app.globalData.arrSoiltotal >= 0) {
        if (curindex == 0) {
          arrSubstrtotal = arrSubstrtotal + app.globalData.arrSoiltotal
        }
        else if (curindex == 1) {
          arrSubstrtotal = arrSubstrtotal + app.globalData.arrSoiltotal
        }
        else if (curindex == 2) {
          arrSubstrtotal = arrSubstrtotal + app.globalData.arrSoiltotal
        }
      } else {
        if (curindex == 0) {
          arrSubstrtotal = arrSubstrtotal + 516
        }
        else if (curindex == 1) {
          arrSubstrtotal = arrSubstrtotal + 946
        }
        else if (curindex == 2) {
          arrSubstrtotal = arrSubstrtotal + 1286
        }
      }
      this.setData({ subtotal: arrSubstrtotal, finalTotal: (arrSubstrtotal * this.data.count * this.data.discount1).toFixed(1) })
    } else if (arrSubstritem.concat(app.globalData.arrSoilitem).length <= 2 && arrSubstritem.concat(app.globalData.arrSoilitem).length >= 1) {// 检测项目数小于等于2，加收20元/样

      this.setData({ discount1: 1, condition: 2 })
      if (app.globalData.arrSoiltotal >= 0) {
        if (curindex == 0) {
          arrSubstrtotal = arrSubstrtotal + app.globalData.arrSoiltotal
        }
        else if (curindex == 1) {
          arrSubstrtotal = arrSubstrtotal + app.globalData.arrSoiltotal
        }
        else if (curindex == 2) {
          arrSubstrtotal = arrSubstrtotal + app.globalData.arrSoiltotal
        }
      } else {
        if (curindex == 0) {
          arrSubstrtotal = arrSubstrtotal + 516
        }
        else if (curindex == 1) {
          arrSubstrtotal = arrSubstrtotal + 946
        }
        else if (curindex == 2) {
          arrSubstrtotal = arrSubstrtotal + 1286
        }
      }
      arrSubstrtotal = arrSubstrtotal + 20
      this.setData({ subtotal: arrSubstrtotal, finalTotal: (arrSubstrtotal * this.data.count * this.data.discount1).toFixed(1) })
    } else if (arrSubstrtotal == 0 && app.globalData.arrSoiltotal == 0) {
      this.setData({ subtotal: 0, finalTotal: 0})
    }
    

  },
  bindMinus: function (e) {
    this.setData({
       count: this.data.count <= 1 ? 1 : (this.data.count - 1),       
    }) 
    // console.log("count:", this.data.count)
    var c = this.data.count
    var ft = this.data.finalTotal 
    if (c < 10) {
      this.setData({ condition: 0 })
      ft = (this.data.subtotal * c * this.data.discount1).toFixed(1)
    } else {
      this.setData({ condition: 1})
      ft = (this.data.subtotal * c * this.data.discount2).toFixed(1)
    }
    this.setData({ finalTotal: ft < this.data.subtotal ? (this.data.subtotal * this.data.discount1).toFixed(1) : ft })
  },
  bindPlus: function (e) {
    this.setData({ 
      count: this.data.count + 1,      
    })
    // console.log("count:", this.data.count)
    var c = this.data.count
    var ft = this.data.finalTotal
    if(c<10){
      this.setData({ condition: 0 })
      ft = (this.data.subtotal * c * this.data.discount1).toFixed(1)   
    }else {
      this.setData({ condition: 1 })
      ft = (this.data.subtotal * c * this.data.discount2).toFixed(1)      
    }
    this.setData({ finalTotal: ft})    
    
  },
  bindManual:function (e) {
    this.setData({ count: e.detail.value == 0 ? 1 : e.detail.value})
    var c = this.data.count
    var ft = this.data.finalTotal
    if (c < 10) {
      this.setData({ condition: 0 })
      ft = (this.data.subtotal * c * this.data.discount1).toFixed(1)
    } else {
      this.setData({ condition: 1 })
      ft = (this.data.subtotal * c * this.data.discount2).toFixed(1)
    }
    this.setData({ finalTotal: ft < this.data.subtotal ? (this.data.subtotal * this.data.discount1).toFixed(1) : ft }) 
  },
  okCheckTap: function () {
    app.globalData.count = this.data.count
    app.globalData.finalTotal = this.data.finalTotal
    if (this.data.finalTotal == 0){
      wx.showModal({
        title: '提示',
        content: '请至少选择一个检测项目',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return
    }else{
      wx.navigateTo({
        url: '../checkPlan/checkPlan'
      })
    }
    
  },
  getCheckItems () {

    var soilBasic = []
    var stromaBasic = []
    const self = this
    wx.request({
      url: 'https://api-dev.daqiuyin.com/api',
      data: {
        "service": "portal",
        "method": "POST",
        "path": "/portal/ql",
        "data": {
          "query": "{ allExamineItems {soil{abbr, display, price}, stroma{abbr, display, price}} }"
        }
      },
      method: 'POST',
      header: {
        'content-type': 'application/json', // 默认值
        'x-auth-token': app.globalData.token
      },
      success: function (res) {
        // console.log(res.data)
        soilBasic[0] = res.data.data.allExamineItems.soil
        self.data.listSoil[0] = soilBasic[0]
        self.setData({
          'self.data.listSoil[0]' : soilBasic[0]
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    delete app.globalData.arrSoiltotal
    delete app.globalData.arrSubstrtotal
    app.globalData.arrSoilitem = this.data.listSoil[this.data.curIndex].map(x => ({ abbr: x.abbr, display: x.display }))
    app.globalData.arrSubstritem = this.data.listSubstrate[this.data.curIndex].map(x => ({ abbr: x.abbr, display: x.display }))
    //this.getCheckItems()
     
    
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

  
})