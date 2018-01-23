const app = getApp()

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function checkLogin() {
  if (app.globalData.userInfo) {
    this.getToken();
  } else if (this.data.canIUse) {
    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    // 所以此处加入 callback 以防止这种情况
    app.userInfoReadyCallback = res => {
      this.getToken();
    }

  } else {
    // 在没有 open-type=getUserInfo 版本的兼容处理
    wx.getUserInfo({
      success: res => {

        app.globalData.userInfo = res.userInfo
        app.globalData.encryptedData = res.encryptedData
        app.globalData.iv = res.iv
        this.getToken();
      }
    })
  }
}

function getToken(){
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
      if (res.data.status == '100') {
        app.globalData.openid = res.data.data.open_id
        app.globalData.token = res.data.data.token
        var token = res.data.data.token
        var openid = res.data.data.open_id
        console.log("openid:", openid)
        console.log("token:", token)
      } else {
        console.log("getToken请求失败：", res.data)
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
    }
  })
}
module.exports = { 
  formatTime: formatTime,
  checkLogin: checkLogin
}

