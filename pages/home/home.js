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
    tittle: '项目介绍',
    content: '土壤是植物生长的物理和营养支撑，不同土壤对农作物的支撑能力存在差异。这种差异由不同土壤的理化性质和肥力水平决定。对土壤理化性质和肥力水平的评估将有助于农业生产者因地制宜地进行农事操作、帮助农业投资者做出物有所值的估价。灌溉用水的质量是决定植物生长的关键因素，对其质量进行检测有助于农业生产者和投资人更有目的性的进行田间管理和规避终端农产品受到污染的风险。生长季节中植物组织中重要元素的检测将有助于农业生产者及时地发现潜在的某种元素的缺乏，适时针对性的补充化肥，以挽回产量和质量的损失。'
  },
  startCheckTap: function () {
    

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
          app.getToken(()=>{
            wx.navigateTo({
              url: '../selectPlan/selectPlan'
            });
          })
        },
        fail:function(e){
          if (e.errMsg =="getUserInfo:fail auth deny"){
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
                      app.getToken(()=>{
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