//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '大蚯蚓数据分析与预报系统',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    src: '../../images/logo.png',
    mode: 'aspectFit'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.switchTab({
      url: '../home/home'
    })
  },
  onLoad: function () {    
    if (app.globalData.userInfo) {
      this.getToken();
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.getToken();
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
      
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {

          app.globalData.userInfo = res.userInfo
          app.globalData.encryptedData = res.encryptedData
          app.globalData.iv = res.iv

          this.getToken();
          this.getOpenid()
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }    
  },
  onShow() {
    if (app.globalData.userInfo) {
      wx.switchTab({
        url: '../home/home'
      })
    }
  },
  getToken(){
    wx.request({
      url: 'https://api-dev.daqiuyin.com/api',
      data: {
        'service': 'auth',
        'method': 'GET',
        'path': '/token/weixin_xcx',
        'data': {
          'code': app.globalData.code,
          'ciphertext': app.globalData.encryptedData,
          'iv': app.globalData.iv,
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
        console.log(res.data)
        if (res.data){
          app.globalData.openid = res.data.data.open_id
          app.globalData.token = res.data.data.token
          var token = res.data.data.token
          var openid = res.data.data.open_id
          console.log("openid:", openid)
          console.log("token:", token)
          wx.switchTab({
            url: '../home/home'
          })
        } else {
          console.log("getToken请求失败：",res.data)
        }       
      }
    })
  },
  getUserInfo: function(e) {
    console.log("getUserInfo:", e)
    if(e.detail.errMsg == "getUserInfo:ok") {
      // 授权成功
      app.globalData.userInfo = e.detail.userInfo
      app.globalData.encryptedData = e.detail.encryptedData
      app.globalData.iv = e.detail.iv
      this.getToken()
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    } else {
      //授权失败
      console.log("获取token失败")
      return
    }
         
  }
  
  
})
