// pages/submitOrder/submitOrder.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phone: '',
    address: '',
    nameShow: false,
    phoneShow: false,
    addrShow: false

  },
  bindNameInput: function (e) {
    this.setData({ nameShow: false })
    this.setData({ name: e.detail.value})
    if (e.detail.value == '' || e.detail.value.trim().length == 0) {
      this.setData({ nameShow: true })
    }
  },
  bindPhoneInput: function (e) {
    this.setData({ phoneShow: false })
    this.setData({ phone: e.detail.value})
    if (e.detail.value == '' || e.detail.value.trim().length == 0) {
      this.setData({ phoneShow: true })
    }
  },
  bindAddressInput: function (e) {
    this.setData({ addrShow: false })
    this.setData({ address: e.detail.value})
    if (e.detail.value == '' || e.detail.value.trim().length == 0) {
      this.setData({ addrShow: true })
    }
  },
  submittap: function () { 
    var that = this
    
    if (this.data.name == '' || this.data.name.trim().length == 0){
      this.setData({ nameShow: true }) 
      
    }  
    if (this.data.phone == '' || this.data.phone.trim().length == 0) {
      this.setData({ phoneShow: true })

    }
    if (this.data.address == '' || this.data.address.trim().length == 0) {
      this.setData({ addrShow: true })
      
    } 

    if (this.data.nameShow || this.data.phoneShow || this.data.addrShow){
      return
    } 

    // 姓名、电话、地址都不为空，方可执行添加地址请求                ·                                     2 ·
    if (!this.data.nameShow && !this.data.phoneShow && !this.data.addrShow) {    
     
      wx.request({
        url: 'https://api-dev.daqiuyin.com/api',
        data: {
          'service': 'portal',
          'method': 'POST',
          'path': '/portal/ql',
          'data': {
            'query': 'mutation{ addAddress(name:\"' + this.data.name + '\", mobile:\"' + this.data.phone + '\", address:\"' + this.data.address + '\") }'
          }
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'x-auth-token': app.globalData.token
        },
        success: function (res) {

        },
        complete: function () {
          if (app.globalData.arrSoilitem && app.globalData.arrSubstritem && app.globalData.count && app.globalData.finalTotal) {
            var arrSoilitem = []
            var arrSubstritem = []
            console.log("arrSubstritem:", arrSubstritem)
            arrSubstritem=''
            console.log("clear-arrSubstritem:", arrSubstritem)

            if(app.globalData.checkType == 0){
              arrSoilitem = (app.globalData.arrSoilitem.map(x => x.abbr)).map(x => ('"' + x + '"'))
              
            }else if(app.globalData.checkType == 1) {
              
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
                  fail: function (err) {

                  }


                })
                
              }
            })

          }

        }
      })   
    }
  },
  /* 支付   */
  pay: function (param) {

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
          url: '../myInfo/myInfo',
          // complete: function () {
          //   wx.navigateTo({
          //     url: '../detailOrder/detailOrder',
          //   })
          // },
          fail: function () {
  
          }
        })
      },
      fail: function (res) {
        // fail
        wx.switchTab({
          url: '../myInfo/myInfo',
          // success: function () {
          //   wx.navigateTo({
          //     url: '../detailOrder/detailOrder',
          //   })
          // }
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
    // 获取收货信息，没有则手动填写
    var self = this
    wx.request({
      url: 'https://api-dev.daqiuyin.com/api',
      data: {
        "service": "portal",
        "method": "POST",
        "path": "/portal/ql",
        "data": {
          "query": "{ myAddress{id, user{id, nick}, name, mobile, address, ctime, utime}}"
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
          address: res.data.data.myAddress.address
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