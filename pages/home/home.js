// pages/home/home.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    src: {
      rose: '../../images/home_head.jpeg',
      soilItem: '../../images/soilItem.png'
    },
    mode: 'widthFix',
    actionSheetHidden: true,
    actionSheetItems: [
      { id: 0, name: '土壤种植检测' },
      { id: 1, name: '基质种植检测' }],
    tittle: '项目介绍',
  },
  
  startCheckTap: function () {
    wx.showActionSheet({
      itemList: ['土壤种植检测','基质种植检测'],
      itemColor:'#157AFB',
      success: res => {
        app.globalData.checkType = res.tapIndex

        if (app.globalData.userInfo) {
          wx.navigateTo({
            url: '../selectPlan/selectPlan'
          });
        } else {
          // 在没有 open-type=getUserInfo 版本的兼容处理

          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo
              app.globalData.encryptedData = res.encryptedData
              app.globalData.iv = res.iv
              wx.showLoading({
                title: '登录中',
              })
              app.getToken(() => {
                wx.navigateTo({
                  url: '../selectPlan/selectPlan'
                });
              })
            },
            fail: function (e) {
              if (e.errMsg == "getUserInfo:fail auth deny") {
                wx.openSetting({
                  success: (res) => {
                    if (res.authSetting['scope.userInfo']) {
                      //继续登录
                      wx.showLoading({
                        title: '登录中',
                      })
                      wx.getUserInfo({
                        success: res => {
                          app.globalData.userInfo = res.userInfo
                          app.globalData.encryptedData = res.encryptedData
                          app.globalData.iv = res.iv
                          app.getToken(() => {
                            wx.hideLoading()
                          })
                        }
                      })
                    }
                  }
                })
              }

            }
          })
        }
      },
      fail: res => {
        console.log(res)
      },
    })

    

  },

  checklogin: function(){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if (app.globalData.userInfo) {

    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {

    //   }

    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       app.globalData.encryptedData = res.encryptedData
    //       app.globalData.iv = res.iv
    //     }
    //   })
    // }  
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
    this.setData({
      actionSheetHidden: 'true'
    })
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

  getUserInfo: function (e) {
    if (e.detail.errMsg == "getUserInfo:ok") {
      // 授权成功
      app.globalData.userInfo = e.detail.userInfo
      app.globalData.encryptedData = e.detail.encryptedData
      app.globalData.iv = e.detail.iv
      app.getToken(() => {
        this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        })
      })

    } else {
      //授权失败
      console.log("获取token失败")
      return
    }

  }
})