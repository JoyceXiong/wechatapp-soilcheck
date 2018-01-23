// pages/myInfo/myInfo.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  checkAllTap: function () {
    app.globalData.payCode = 1
    wx.navigateTo({
      url: '../checkAllOrders/checkAllOrders',
    })
  },
  checkInitial: function () {
    app.globalData.payCode = 2
    wx.navigateTo({
      url: '../checkAllOrders/checkAllOrders',
    })
  },
  checkPaid: function () {
    app.globalData.payCode = 3
    wx.navigateTo({
      url: '../checkAllOrders/checkAllOrders',
    })
  },
  checkShipped: function () {
    app.globalData.payCode = 4
    wx.navigateTo({
      url: '../checkAllOrders/checkAllOrders',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
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
    if (app.globalData.orderid){
      wx.navigateTo({
        url: '../detailOrder/detailOrder?orderid=' + app.globalData.orderid,
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (app.globalData.orderid) {
      app.globalData.orderid="";
    }
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
      app.getToken(()=>{
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