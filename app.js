//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.globalData.code=res.code;     
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        wx.showLoading({
          title: '加载中',
        })
        // if (res.authSetting['scope.userInfo']) {
        //   // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        // }
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId
            this.globalData.userInfo = res.userInfo
            this.globalData.encryptedData = res.encryptedData
            this.globalData.iv = res.iv
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            this.getToken(()=>{
              wx.hideLoading()
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            })
            
          },
          fail:function(){
            wx.hideLoading();
            wx.showModal({
              title: '提示',
              content: '登录失败请重新尝试',
            })
          }
        })
      }
    })
    
  },

  getToken: function(cb) {
    const self = this;
    wx.request({
      url: 'https://api-dev.daqiuyin.com/api',
      data: {
        'service': 'auth',
        'method': 'GET',
        'path': '/token/weixin_xcx',
        'data': {
          'code': self.globalData.code,
          'ciphertext': self.globalData.encryptedData,
          'iv': self.globalData.iv,
          'origin': 'weixin_xcx',
          'channel': 'soil'
        },
        'extra': {
          'version': 'test',
          'zone': 6,
          'position': [0, 0],
          'country': 'CN',
          'lang': 'zh',
          'phone': 'iPhone x'
        }
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.status == '100') {
          self.globalData.openid = res.data.data.open_id
          self.globalData.token = res.data.data.token
          var token = res.data.data.token
          var openid = res.data.data.open_id
        } else {
          wx.showModal({
            title: '提示',
            content: '登录失败，请检查你的网络，重新启动小程序',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
          return
        }
      },
      complete:function(){
        if (cb){
          cb();
        }
      }
    })
  },

  globalData: {
    userInfo: null,
    count: 0,
    finalTotal: 0,
    arrSoilitem:[],
    arrSoiltotal:0,
    arrSubstrateitem: [],
    arrSubstratetotal: 0,
    code: '',
    encryptedData: '',
    iv: '',
    token: ''
  }
})