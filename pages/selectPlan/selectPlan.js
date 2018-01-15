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
    curIndex: 2,
    subtotal: 2354,
    count: 1,
    finalTotal:2118.6.toFixed(1),
    isChecked: true,
    condition: 0, // 优惠条件
    discount1: 0.9, // 优惠折扣，任意套餐9折
    discount2: 0.8, // 优惠折扣，检查样数多余10样（含10样）8折
    items: [
      { id: 0, name: '基础套餐'},
      { id: 1, name: '豪华套餐' },
      { id: 2, name: '顶级套餐', checked: 'true' }
    ],
    listSoil: [
      [
        { abbr: 'water', display: "水分", price: 20},
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
        { abbr: 'B', display: "有效硼(B)", price: 70 },
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
        { abbr: 'B', display: "有效硼(B)", price: 70 },
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
        { abbr: 'B', display: "有效硼(B)", price: 70 },
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
    showSoil: [      
        { abbr: 'water', display: "水分", price: 20 , checked: 'true' },
        { abbr: 'PH', display: "pH", price: 24 , checked: 'true' },
        { abbr: 'EC', display: "电导率（EC)", price: 24 , checked: 'true' },
        { abbr: 'pb', display: "容重", price: 24 , checked: 'true' },
        { abbr: 'sw', display: "比重", price: 24 , checked: 'true' },
        { abbr: 'som', display: "有机质", price: 40 , checked: 'true' },
        { abbr: 'NO3_', display: "硝态氮(NO3-)", price: 50 , checked: 'true' },
        { abbr: 'NH4', display: "铵态氮(NH4+)", price: 50 , checked: 'true' },
        { abbr: 'P', display: "有效磷(P)", price: 50 , checked: 'true' },
        { abbr: 'K', display: "有效钾(K)", price: 60 , checked: 'true' },
        { abbr: 'S', display: "有效硫(S)", price: 50 , checked: 'true' },
        { abbr: 'Ca', display: "交换性钙含量(Ca)", price: 50 , checked: 'true' },
        { abbr: 'Mg', display: "交换性镁含量(Mg)", price: 50 , checked: 'true' },
        { abbr: 'B', display: "有效硼(B)", price: 70 , checked: 'true' },
        { abbr: 'Fe', display: "有效铁(Fe)", price: 70 , checked: 'true' },
        { abbr: 'Mn', display: "有效锰(Mn)", price: 70 , checked: 'true' },
        { abbr: 'Zn', display: "有效锌(Zn)", price: 70 , checked: 'true' },
        { abbr: 'Cu', display: "有效铜(Cu)", price: 70 , checked: 'true' },
        { abbr: 'Mo', display: "有效钼(Mo)", price: 80 , checked: 'true' },
        { abbr: 'Cl', display: "可溶性氯(Cl)", price: 50 , checked: 'true' },
        { abbr: 'Na', display: "交换性钠(Na)", price: 50 , checked: 'true' },
        { abbr: 'Si', display: "有效硅(Si)", price: 50 , checked: 'true' },
        { abbr: 'CO3', display: "碳酸根(CO3)", price: 40 , checked: 'true' },
        { abbr: 'HCO3_', display: "碳酸氢根(HCO3-）", price: 40 , checked: 'true' },
        { abbr: 'N', display: "全氮（N)", price: 50 , checked: 'true' },
        { abbr: 'aP', display: "全磷(P)", price: 60 , checked: 'true' }
      
    ],
    showStroma: [
      
        { abbr: 'PH', display: "pH", price: 24 , checked: 'true' },
        { abbr: 'EC', display: "电导率（EC）", price: 24 , checked: 'true' },
        { abbr: 'NO3_', display: "硝态氮(NO3-)", price: 50 , checked: 'true' },
        { abbr: 'NH4', display: "铵态氮(NH4+)", price: 50 , checked: 'true' },
        { abbr: 'P', display: "有效磷(P)", price: 50 , checked: 'true' },
        { abbr: 'K', display: "有效钾(K)", price: 60 , checked: 'true' },
        { abbr: 'S', display: "有效硫(S)", price: 50 , checked: 'true' },
        { abbr: 'Ca', display: "交换性钙含量(Ca)", price: 50 , checked: 'true' },
        { abbr: 'Mg', display: "交换性镁含量(Mg)", price: 50 , checked: 'true' },
        { abbr: 'B', display: "有效硼（B)", price: 70 , checked: 'true' },
        { abbr: 'Fe', display: "有效铁(Fe)", price: 70 , checked: 'true' },
        { abbr: 'Mn', display: "有效锰(Mn)", price: 70 , checked: 'true' },
        { abbr: 'Zn', display: "有效锌(Zn)", price: 70 , checked: 'true' },
        { abbr: 'Cu', display: "有效铜(Cu)", price: 70 , checked: 'true' },
        { abbr: 'Mo', display: "有效钼(Mo)", price: 80 , checked: 'true' },
        { abbr: 'Cl', display: "可溶性氯(Cl)", price: 50 , checked: 'true' },
        { abbr: 'Na', display: "交换性钠(Na)", price: 50 , checked: 'true' },
        { abbr: 'Si', display: "可溶性硅(Si)", price: 50 , checked: 'true' },
        { abbr: 'CO3', display: "碳酸根(CO3)", price: 40 , checked: 'true' },
        { abbr: 'HCO3_', display: "碳酸氢根(HCO3-）", price: 40 , checked: 'true' }
      
    ],
    tip1: "检测指标低于2项加收20元/样的样本处理费",
    tip2: "选择任意套餐享9折优惠",
    tip3: "订单超过10个土样享8折优惠",
  },
  radioChange: function (e) {    
    console.log('radio发生change事件，携带value值为：', e.detail.value) 
    var showSoil = this.data.showSoil
    var showStroma = this.data.showStroma
    showSoil.map(x => (x.checked =false))
    showStroma.map(x => (x.checked = false))

    var index = e.detail.value 
    var arr1 = this.data.listSoil[index] // 拿到基础套餐土壤检测项目
    var arr2 = this.data.listSubstrate[index] // 拿到基础套餐土壤基质检测项目
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
    // 处理页面展示
    // 土壤检测项目
    for (var i = 0; i < arr1.length;i++){
      for(var j=0;j< showSoil.length;j++){
        if (arr1[i].abbr == showSoil[j].abbr){
          showSoil[j].checked = true
        }
      }
    }
    // 基质检测项目
    for (var i = 0; i < arr2.length; i++) {
      for (var j = 0; j < showStroma.length; j++) {
        if (arr2[i].abbr == showStroma[j].abbr) {
          showStroma[j].checked = true
        }
      }
    }
    this.setData({
      showSoil: showSoil,
      showStroma: showStroma
    })
  },
  checkboxChangeSoil: function (e) {    
    var arrSoil = e.detail.value 
    // console.log("checkboxChangeSoil:", arrSoil  )
    var arrSoilitem = arrSoil.map(x => x.split(" ")).map(x => ({ abbr: x[0], display: x[1] }))
    var arrSoiltotal = arrSoil.map(x => x.split(" ")).map(x => parseInt(x[2])).reduce((s, v) => s + v,0)
    console.log("arrSoilitem:", arrSoilitem)
    console.log("arrSoiltotal:", arrSoiltotal)

    var curindex = this.data.curIndex
    // 添加app全局数据供后面使用
    app.globalData.arrSoilitem = arrSoilitem
    app.globalData.arrSoiltotal = arrSoiltotal
    
    // 如果所选检测项目完全符合套餐项目，打9折 ；不同于套餐项目数，不打折；检测项目数小于等于2，加收20元/样 
    var choseItems = arrSoilitem.concat(app.globalData.arrSubstritem)
    var planA = this.data.listSoil[0].concat(this.data.listSubstrate[0])
    var planB = this.data.listSoil[1].concat(this.data.listSubstrate[1])
    var planC = this.data.listSoil[2].concat(this.data.listSubstrate[2])
    choseItems = choseItems.map(x => (x.abbr))
    planA = planA.map(x => (x.abbr))
    planB = planB.map(x => (x.abbr))
    planC = planC.map(x => (x.abbr))
    // 是否是基础套餐
    var isPlanA =false
    if (choseItems.length > planA.length || choseItems.length < planA.length){
      isPlanA = false
    } else if (choseItems.length == planA.length){
      for (var i = 0; i < choseItems.length;i++){
        if (planA.indexOf(choseItems[i])===-1){
          isPlanA = false
          break
        }else {
          isPlanA = true
        }          
      }
    }
    // 是否豪华套餐
    var isPlanB = false
    if (choseItems.length > planB.length || choseItems.length < planB.length) {
      isPlanB = false
    } else if (choseItems.length == planB.length) {
      for (var i = 0; i < choseItems.length; i++) {
        if (planB.indexOf(choseItems[i]) === -1) {
          isPlanB = false
          break
        } else {
          isPlanB = true
        }
      }
    }
    // 是否顶级套餐
    var isPlanC = false
    if (choseItems.length > planC.length || choseItems.length < planC.length) {
      isPlanC = false
    } else if (choseItems.length == planC.length) {
      for (var i = 0; i < choseItems.length; i++) {
        if (planC.indexOf(choseItems[i]) === -1) {
          isPlanC = false
          break
        } else {
          isPlanC = true
        }
      }
    }   
     
    console.log("isPlanA:", isPlanA)
    console.log("isPlanB:", isPlanB)
    console.log("isPlanC:", isPlanC)
    

    var isPlan = (isPlanA || isPlanB || isPlanC)
    console.log("isPlan:", isPlan)
    // 如果所选检测项目完全符合套餐项目，打9折 ；
    if (isPlan){
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

      // this.setData({ discount1: 0.9, condition: 0})
      var tmpCondition = (this.data.count < 10 ? 0 : 1)
      var discount = (this.data.count < 10 ? this.data.discount1 : this.data.discount2)
      if (isPlanA) { this.setData({ 'items[0].checked': 'true' }) }
      if (isPlanB) { this.setData({ 'items[1].checked': 'true' }) }
      if (isPlanC) { this.setData({ 'items[2].checked': 'true' }) }
      this.setData({ subtotal: arrSoiltotal, finalTotal: (arrSoiltotal * this.data.count * discount).toFixed(1), condition: tmpCondition})
    } 
    // 项目数不等于当前套餐，但又不完全符合任意套餐所含明细，不打折；    
    else if (arrSoilitem.concat(app.globalData.arrSubstritem).length < this.data.listSoil[curindex].concat(this.data.listSubstrate[curindex]).length && arrSoilitem.concat(app.globalData.arrSubstritem).length > 2 || (arrSoilitem.concat(app.globalData.arrSubstritem).length >= this.data.listSoil[curindex].concat(this.data.listSubstrate[curindex]).length &&isPlan==false)){
      //this.setData({ discount1: 1 ,condition: 3})
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
      var tmpCondition = (this.data.count < 10 ? 3 : 1)
      var discount = (this.data.count < 10 ? 1 : this.data.discount2)
      this.setData({ subtotal: arrSoiltotal, finalTotal: (arrSoiltotal * this.data.count * discount).toFixed(1), condition: tmpCondition})
    }
    // 检测项目数小于等于2，加收20元/样
     else if (arrSoilitem.concat(app.globalData.arrSubstritem).length <= 2 && arrSoilitem.concat(app.globalData.arrSubstritem).length >= 1) {
      //console.log("arrSubstritem.length:", app.globalData.arrSubstritem.length)
      //this.setData({ discount1: 1, condition: 2 })
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
      console.log("少于2样：", arrSoiltotal)
      var tmpCondition = (this.data.count < 10 ? 2 : 1)
      var discount = (this.data.count < 10 ? 1 : this.data.discount2)    
      
      this.setData({ subtotal: arrSoiltotal, finalTotal: (arrSoiltotal * this.data.count * discount).toFixed(1), condition: tmpCondition })
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

    // 如果所选检测项目完全符合套餐项目，打9折 ；不同于套餐项目数，不打折；检测项目数小于等于2，加收20元/样 
    var choseItems = arrSubstritem.concat(app.globalData.arrSoilitem)
    var planA = this.data.listSubstrate[0].concat(this.data.listSoil[0])
    var planB = this.data.listSubstrate[1].concat(this.data.listSoil[1])
    var planC = this.data.listSubstrate[2].concat(this.data.listSoil[2])
    choseItems = choseItems.map(x => (x.abbr))
    planA = planA.map(x => (x.abbr))
    planB = planB.map(x => (x.abbr))
    planC = planC.map(x => (x.abbr))
    // 是否是基础套餐
    var isPlanA = false
    if (choseItems.length > planA.length || choseItems.length < planA.length) {
      isPlanA = false
    } else if (choseItems.length == planA.length) {
      for (var i = 0; i < choseItems.length; i++) {
        if (planA.indexOf(choseItems[i]) === -1) {
          isPlanA = false
          break
        } else {
          isPlanA = true
        }
      }
    }
    // 是否豪华套餐
    var isPlanB = false
    if (choseItems.length > planB.length || choseItems.length < planB.length) {
      isPlanB = false
    } else if (choseItems.length == planB.length) {
      for (var i = 0; i < choseItems.length; i++) {
        if (planB.indexOf(choseItems[i]) === -1) {
          isPlanB = false
          break
        } else {
          isPlanB = true
        }
      }
    }
    // 是否顶级套餐
    var isPlanC = false
    if (choseItems.length > planC.length || choseItems.length < planC.length) {
      isPlanC = false
    } else if (choseItems.length == planC.length) {
      for (var i = 0; i < choseItems.length; i++) {
        if (planC.indexOf(choseItems[i]) === -1) {
          isPlanC = false
          break
        } else {
          isPlanC = true
        }
      }
    }

    console.log("jz-isPlanA:", isPlanA)
    console.log("jz-isPlanB:", isPlanB)
    console.log("jz-isPlanC:", isPlanC)
    // 判断当前选项，属于某一套餐
    var isPlan = (isPlanA || isPlanB || isPlanC)
    console.log("jz-isPlan:", isPlan)
    var curindex = this.data.curIndex
    if (isPlan) { // 套餐，打9折
      // this.setData({ discount1: 0.9, condition: 0 })
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

      var tmpCondition = (this.data.count < 10 ? 0 : 1)
      var discount = (this.data.count < 10 ? this.data.discount1 : this.data.discount2) 
      if (isPlanA) { this.setData({ 'items[0].checked': 'true' }) }
      if (isPlanB) { this.setData({ 'items[1].checked': 'true' }) }
      if (isPlanC) { this.setData({ 'items[2].checked': 'true' }) }
      this.setData({ subtotal: arrSubstrtotal, finalTotal: (arrSubstrtotal * this.data.count * discount).toFixed(1), condition: tmpCondition})
    } else if (arrSubstritem.concat(app.globalData.arrSoilitem).length < this.data.listSoil[curindex].concat(this.data.listSubstrate[curindex]).length && arrSubstritem.concat(app.globalData.arrSoilitem).length > 2 || (arrSubstritem.concat(app.globalData.arrSoilitem).length >= this.data.listSoil[curindex].concat(this.data.listSubstrate[curindex]).length && isPlan == false)) {
       
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
      var tmpCondition = (this.data.count < 10 ? 3 : 1)
      var discount = (this.data.count < 10 ? 1: this.data.discount2) 
      this.setData({ subtotal: arrSubstrtotal, finalTotal: (arrSubstrtotal * this.data.count * discount).toFixed(1), condition: tmpCondition})
    } else if (arrSubstritem.concat(app.globalData.arrSoilitem).length <= 2 && arrSubstritem.concat(app.globalData.arrSoilitem).length >= 1) {// 检测项目数小于等于2，加收20元/样

       
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
      var tmpCondition = (this.data.count < 10 ? 2 : 1)
      var discount = (this.data.count < 10 ? 1 : this.data.discount2)
      this.setData({ subtotal: arrSubstrtotal, finalTotal: (arrSubstrtotal * this.data.count * discount).toFixed(1), condition: tmpCondition })
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