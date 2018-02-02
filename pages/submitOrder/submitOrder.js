// pages/submitOrder/submitOrder.js
const app = getApp()
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phone: '',
    address: '',
    email: '',
    plant: '',
    area: '',
    getSoilDate: '2018-01-01',
    nameShow: false,
    phoneShow: false,
    addrShow: false,
    plantShow: false,
    getSoilDateShow: false,
    phoneFocus: false,
    emailFocus: false,
    btnDisabel: false,

  },
  bindNameInput: function (e) {
    this.setData({ nameShow: false })
    this.setData({ name: e.detail.value})
    if (!e.detail.value  || e.detail.value.trim().length == 0) {
      this.setData({ nameShow: true })
    }
  },
  bindPhoneInput: function (e) {
    var self = this
    if (!e.detail.value || e.detail.value.trim().length == 0) {
      this.setData({ phoneShow: true, phone: '', phoneFocus: false })
    }
    var phone = e.detail.value
    var reg = /^((0\d{2,3}\d{7,8})|(1[34578]\d{9}))$/
    if(phone){
      if(reg.test(phone)){
        this.setData({ phone: e.detail.value, phoneShow: false})
      }else {
        wx.showModal({
          title: '提醒',
          content: '电话号码不正确，请重新填写。座机请加区号',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              self.setData({ phoneFocus: true, phone: e.detail.value })
            }
          }
        })
      }
    }
  },
  bindAddressInput: function (e) {
    this.setData({ addrShow: false })
    this.setData({ address: e.detail.value})
    if (!e.detail.value || e.detail.value.trim().length == 0) {
      this.setData({ addrShow: true })
    }
  },
  emailBindblur: function (e) {
    var self = this
    var mail = e.detail.value
    var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if (mail.trim().length>0){
      if (reg.test(mail)) {
        this.setData({ email: e.detail.value, emailFocus: false })
      } else {
        wx.showModal({
          title: '提醒',
          content: '邮箱格式不正确，请正确填写或者不填',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              self.setData({ email: e.detail.value, emailFocus: true})
            } 
          }
        })
      }
    }else{
      self.setData({ email: e.detail.value, emailFocus: false })
    } 
    
  },
  bindAddressInput:function(e){
    this.setData({ email: e.detail.value })
  },
  bindPlantInput: function (e) {
    this.setData({ plantShow: false })
    this.setData({ plant: e.detail.value })
    if (!e.detail.value || e.detail.value.trim().length == 0) {
      this.setData({ plantShow: true })
    }
  },
  bindAreaInput: function (e) {
    var myarea = 0
    if (isNaN(parseFloat(e.detail.value))){
      myarea = ''
    } else {
      myarea = parseFloat(e.detail.value).toFixed(1)
    }
    this.setData({ area: myarea})
  },
  bindDateChange: function (e) {
    this.setData({ getSoilDateShow: false })
    this.setData({ getSoilDate: e.detail.value })
    if (!e.detail.value || e.detail.value.trim().length == 0) {
      this.setData({ getSoilDateShow: true })
    }
  },
  submittap: function () { 
    var that = this
    
    if (!this.data.name  || this.data.name.trim().length == 0){
      this.setData({ nameShow: true }) 
      
    }  
    if (!this.data.phone  || this.data.phone.trim().length == 0) {
      this.setData({ phoneShow: true })

    }
    if (!/^((0\d{2,3}\d{7,8})|(1[34578]\d{9}))$/.test(this.data.phone)){

      wx.showModal({
        title: '提示',
        content: '电话号码不正确，请正确填写后再提交订单',
        showCancel: false
      })
      return
    }
    if (!this.data.address  || this.data.address.trim().length == 0) {
      this.setData({ addrShow: true })

    }

    if (this.data.email&&(this.data.email).trim().length>0){
      if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.data.email)) {
        wx.showModal({
          title: '提示',
          content: '邮箱格式不正确，请正确填写或者不填，然后再提交订单',
          showCancel: false,
        })
        return
      }
    }
    
    if (!this.data.plant  || this.data.plant.trim().length == 0) {
      this.setData({ plantShow: true })

    } 
    if (!this.data.getSoilDate  || this.data.getSoilDate.trim().length == 0) {
      this.setData({ getSoilDateShow: true })

    }

    if (this.data.nameShow || this.data.phoneShow || this.data.addrShow || this.data.plantShow || this.data.getSoilDateShow){
      return
    } 

    // 姓名、电话、地址、种植作物、取土时间 都不为空，方可执行添加地址请求
    if (!this.data.nameShow && !this.data.phoneShow && !this.data.addrShow && !this.data.plantShow && !this.data.getSoilDateShow) {  
      wx.request({
        url: 'https://api-dev.daqiuyin.com/api',
        data: {
          'service': 'portal',
          'method': 'POST',
          'path': '/portal/ql',
          'data': {
            'query': 'mutation{ addAddress(name:\"' + this.data.name + '\", mobile:\"' + this.data.phone + '\", address:\"' + this.data.address + '\" , email:\"' + this.data.email + '\", area:\"' + this.data.area + '\", plant:\"' + this.data.plant + '\", get_time:\"' + this.data.getSoilDate +'\") }'
          }
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'x-auth-token': app.globalData.token
        },
        success: function (res) {
          if (app.globalData.arrSoilitem && app.globalData.arrSubstritem && app.globalData.count && app.globalData.finalTotal) {
            var arrSoilitem = []
            var arrSubstritem = []
            arrSubstritem = ''

            if (app.globalData.checkType == 0) {
              arrSoilitem = (app.globalData.arrSoilitem.map(x => x.abbr)).map(x => ('"' + x + '"'))

            } else if (app.globalData.checkType == 1) {

              arrSubstritem = (app.globalData.arrSubstritem.map(x => x.abbr)).map(x => ('"' + x + '"'))
            }
            // 提交订单
            wx.request({
              url: 'https://api-dev.daqiuyin.com/api',
              data: {
                'service': 'portal',
                'method': 'POST',
                'path': '/portal/ql',
                'data': {
                  'query': 'mutation{ placeOrder(examine_soil:[' + arrSoilitem + '], examine_stroma:[' + arrSubstritem + '], quantity:' + app.globalData.count + ', amount:' + app.globalData.finalTotal + '){id, examine_soil{abbr, display}, examine_stroma{abbr, display}, quantity, amount, status, ctime } }'
                }
              },
              method: 'POST',
              header: {
                'content-type': 'application/json', // 默认值
                'x-auth-token': app.globalData.token
              },
              success: function (res) {

                app.globalData.orderid = res.data.data.placeOrder.id
                // 获取微信支付参数
                wx.request({
                  url: "https://api-dev.daqiuyin.com/api",
                  data: {
                    "service": "portal",
                    "method": "POST",
                    "path": "/portal/wxpay/getBrandWCPayRequestParams",
                    "data": {
                      // "total_fee": 1,
                      "total_fee": Number(app.globalData.finalTotal * 100).toFixed(0),
                      "orderid": app.globalData.orderid,
                      "openid": app.globalData.openid
                    }
                  },
                  method: "POST",
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
                    // 跳转到微信支付
                    that.pay(param)

                  },
                  fail: function (res) {
                    wx.showModal({
                      title: '提示',
                      content: res.errMsg,
                      showCancel: false,
                      success: function (res) {

                      }
                    })
                  }


                })

              }
            })

          }
        },
        fail: function (res){
          wx.showModal({
            title: '提示',
            content: res.errMsg,
            showCancel: false,
            success: function (res) {

            }
          })
        },
        complete: function () {
          

        }
      })   
    }
  },
  /* 支付   */
  pay: function (param) {
    var self = this
    wx.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.package,
      signType: 'MD5',
      paySign: param.paySign,
      success: function (res) {
        // success
        // wx.showToast({
        //   title: '支付成功',
        //   icon: 'success',
        //   duration: 1500
        // })
        wx.switchTab({
          url: '../myInfo/myInfo'
        })
      },
      fail: function (res) {

        let errMsg = res.errMsg
        if (errMsg ==='requestPayment:fail cancel'){
          errMsg = '支付取消'
        }
        wx.showModal({
          title: '提示',
          content: errMsg,
          showCancel: false,
          success: function (res) {
            // fail
            wx.switchTab({
              url: '../myInfo/myInfo',
              // success: function () {
              //   wx.navigateTo({
              //     url: '../detailOrder/detailOrder',
              //   })
              // }
            })
          }
        })
        
      },
      complete: function () {
        self.setData({ btnDisabel: true})      
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var curDate = util.formatTime(new Date()).substr(0, 10)
    this.setData({ getSoilDate: curDate})
    // 获取收货信息，没有则手动填写
    var self = this
    wx.request({
      url: 'https://api-dev.daqiuyin.com/api',
      data: {
        "service": "portal",
        "method": "POST",
        "path": "/portal/ql",
        "data": {
          "query": "{ myAddress{id, user{id, nick}, name, mobile, address, email, area, plant, get_time, ctime, utime}}"
        }
      },
      method: 'POST',
      header: {
        'content-type': 'application/json', // 默认值
        'x-auth-token': app.globalData.token
      },
      success: function (res) {
        self.setData({
          name: res.data.data.myAddress.name,
          phone: res.data.data.myAddress.mobile,
          address: res.data.data.myAddress.address,
          email: res.data.data.myAddress.email,
          plant: res.data.data.myAddress.plant,
          area: res.data.data.myAddress.area,
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

    var curDate = util.formatTime(new Date()).substr(0, 10)
    this.setData({ getSoilDate: curDate ,btnDisable: false})


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