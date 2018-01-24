// pages/payingOder/payingOder.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight:0,
    status: '',
    orderid: '',
    arrSoilItem: [],
    arrSubstrateItem: [],
    total:0,
    name:'',
    phone:'',
    address:'',
    orderTime: '',
    soilShow: true,
    stromaShow: true,
    receiver: '土壤检测组',
    receivePhone: '15112345678',
    receiveAddr: '北京市朝阳区时间国际8号楼1510',
    report: ''
  },
  soilSampleTap: function () {
    wx.navigateTo({
      url: '../sampleInstruction/sampleInstruction',
    })
  },
  topaytap: function (e) {
    var self = this;
    var that = this;
    var total = Number(this.data.total * 100).toFixed(0);
    console.log(this.data);
    // 获取微信支付参数
    wx.request({
      url: "https://api-dev.daqiuyin.com/api",
      data: {
        "service": "portal",
        "method": "POST",
        "path": "/portal/wxpay/getBrandWCPayRequestParams",
        "data": {
          // "total_fee": 1,
          "total_fee": total ,
          "orderid": self.orderid,
          "openid": app.globalData.openid          
        }
      },
      method:"POST",
      header: {
        "content-type": "application/json", // 默认值
        "x-auth-token": app.globalData.token
      },
      success: function (res) {
        var appId = res.data.appId
        var timeStamp = res.data.timeStamp
        var nonceStr = res.data.nonceStr
        var packages = res.data.package
        var signType = res.data.signType
        var paySign = res.data.paySign
        var param = { "appId": appId, "timeStamp": timeStamp, "package": packages, "paySign": paySign, "signType": signType, "nonceStr": nonceStr }
        that.pay(param)
            
      },
      fail: function (err) {

      }

    })    
    
  },
  /* 支付   */
  pay: function (param) {
    //console.log("param:",param)
    var self = this
    wx.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.package,
      signType: 'MD5',
      paySign: param.paySign,
      success: function (res) {
        // success
        console.log("到支付这里")
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 2000
        })
        self.getOrderDetail();
        // wx.navigateBack({
        //   delta: 1, // 回退前 delta(默认为1) 页面
        //   success: function (res) {
        //     wx.showToast({
        //       title: '支付成功',
        //       icon: 'success',
        //       duration: 2000
        //     })
            
        //   },
        //   fail: function () {
        //     // fail
        //     return
        //   },
        //   complete: function () {
        //     // complete
        //   }
        // })
      },
      fail: function (res) {
        // fail

      },
      complete: function () {
        // complete
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.orderid = options.orderid;
    // this.setScrollViewHeight();
    // 获取订单详情
    this.getOrderDetail();
  },

  getOrderDetail:function(){
    var self = this;
    wx.request({
      url: "https://api-dev.daqiuyin.com/api",
      data: {
        "service": "portal",
        "method": "POST",
        "path": "/portal/ql",
        "data": {
          "query": "{ orderInfo(id:\"" + this.orderid + "\"){id, user{id, nick}, recipient{name, mobile, address}, examine_soil{abbr, display}, examine_stroma{abbr, display}, quantity, amount, status, ctime, ptime }}"
        }
      },
      method: "POST",
      header: {
        "content-type": "application/json", // 默认值
        "x-auth-token": app.globalData.token
      },
      success: function (res) {
        app.globalData.finalTotal = res.data.data.orderInfo.amount
        var arrSoil = res.data.data.orderInfo.examine_soil.map(x => x.display)
        var arrStroma = res.data.data.orderInfo.examine_stroma.map(x => x.display)
        if (arrSoil.length == 0) {
          self.setData({ soilShow: false })
        }
        if (arrStroma.length == 0) {
          self.setData({ stromaShow: false })
        }
        self.setData({
          status: res.data.data.orderInfo.status,
          arrSoilItem: res.data.data.orderInfo.examine_soil.map(x => x.display),
          arrSubstrateItem: res.data.data.orderInfo.examine_stroma.map(x => x.display),
          total: res.data.data.orderInfo.amount,
          name: res.data.data.orderInfo.recipient.name,
          phone: res.data.data.orderInfo.recipient.mobile,
          address: res.data.data.orderInfo.recipient.address,
          orderTime: new Date(res.data.data.orderInfo.ctime).toLocaleString(),
          orderid: self.orderid

        })
      }

    })
  },
  setScrollViewHeight() {
    var self = this;
    wx.getSystemInfo({
      success: function (res2) {
        //scroll高度
        self.setData({
          scrollHeight: res2.windowHeight
        })
      }
    })
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
  
  }
})