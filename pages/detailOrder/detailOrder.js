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
    quantity: 0,
    total:0,
    name:'',
    phone:'',
    address: '',
    email: '',
    area: 0,
    plant: '',
    getSoilTime: '2018-01-01',
    orderTime: '',
    soilShow: true,
    stromaShow: true,
    receiver: '土壤检测组',
    receivePhone: '15112345678',
    receiveAddr: '北京市朝阳区时间国际8号楼1510',
    report: '',
    reportUrl: '',
    hiddenmodalput: true,
    showModal: false,
    emailFocus: false,
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
        let errMsg = res.errMsg
        if (errMsg === 'requestPayment:fail cancel') {
          errMsg = '支付取消'
        }
        wx.showModal({
          title: '提示',
          content: errMsg,
          showCancel: false,
          success: function (res) {
          }
        })

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
    console.log("options.orderid:", options.orderid)
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
          "query": "{ orderInfo(id:\"" + this.orderid + "\"){id, user{id, nick}, recipient{name, mobile, address, email, area, plant, get_time}, examine_soil{abbr, display}, examine_stroma{abbr, display}, quantity, amount, status, ctime, ptime, report_url }}"
        }
      },
      method: "POST",
      header: {
        "content-type": "application/json", // 默认值
        "x-auth-token": app.globalData.token
      },
      success: function (res) {
        console.log(res)
        
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
          quantity: res.data.data.orderInfo.quantity,
          total: res.data.data.orderInfo.amount,
          name: res.data.data.orderInfo.recipient.name,
          phone: res.data.data.orderInfo.recipient.mobile,
          address: res.data.data.orderInfo.recipient.address,
          email: res.data.data.orderInfo.recipient.email,
          area: res.data.data.orderInfo.recipient.area,
          plant: res.data.data.orderInfo.recipient.plant,
          getSoilTime: res.data.data.orderInfo.recipient.get_time,
          orderTime: new Date(res.data.data.orderInfo.ctime).toLocaleString(),
          orderid: self.orderid,
          reportUrl: res.data.data.orderInfo.report_url
          
        })
        app.globalData.reportUrl = res.data.data.orderInfo.report_url
        //self.downloadReport()
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
  // 下载检测报告并在页面上展示
  downloadReport: function downloadReport () {
    var self = this
    if (this.data.reportUrl){
      wx.downloadFile({
        url: app.globalData.reportUrl,
        header: {},
        success: function (res) {
          console.log(res)
          // self.setData({ reportUrl: res.tempFilePath })
          wx.openDocument({
            filePath: res.tempFilePath,
            success: res => {
              console.log("打开文件成功:", res)
            }
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    
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

  //弹出输入框

  // modalinput: function () {
  //   this.setData({
  //     hiddenmodalput: !this.data.hiddenmodalput
  //   })
  // },
  // //取消按钮  
  // cancel: function () {
  //   this.setData({
  //     hiddenmodalput: true
  //   });
  // },
  // //确认  
  // confirm: function () {
  //   this.setData({
  //     hiddenmodalput: true
  //   })
  // }  



  /**
     * 弹窗
     */
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    var self = this
    var mail = this.data.email
    var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if (mail) {
      if (reg.test(mail)) {
        this.setData({ email: e.detail.value, emailFocus: false })
        this.hideModal();
      } else {
        wx.showModal({
          title: '提醒',
          content: '邮箱格式不正确，请填写正确的邮箱',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              self.setData({  emailFocus: true })
            }
          }
        })
      }
    }
  },
  /**
   * 对话框输入框事件
   */
  inputChange: function (e) {
    console.log(e.detail.value)
    this.setData({ email: e.detail.value})
  },


})