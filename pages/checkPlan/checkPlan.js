// pages/checkPlan/checkPlan.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrSoilitem: [],
    arrSubstritem: [],
    count: 0,
    total:0,
    soilShow: true,
    stromaShow: true
  },
  nexttap: function () {
    wx.navigateTo({
      url: '../submitOrder/submitOrder',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("appcount:",app.globalData.count)
    // console.log("ft:", app.globalData.finalTotal)
    console.log("arrSoilitem:", app.globalData.arrSoilitem)
    var arrSoil = app.globalData.arrSoilitem.map(x => x.display)
    var arrStroma = app.globalData.arrSubstritem.map(x => x.display)
    if (arrSoil.length == 0) {
      this.setData({ soilShow: false })
    }
    if (arrStroma.length == 0) {
      this.setData({ stromaShow: false })
    }
    this.setData({ 
      count: app.globalData.count,
      total: app.globalData.finalTotal,
      arrSoilitem: app.globalData.arrSoilitem.map(x=>x.display),
      arrSubstritem: app.globalData.arrSubstritem.map(x => x.display)
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