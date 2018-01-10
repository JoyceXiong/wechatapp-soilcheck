// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: {
      rose: '../../images/home_head.jpeg',
      soilItem: '../../images/soilItem.png'
    },
    mode: 'aspectFit',
    tittle: '项目介绍',
    content: '土壤是植物生长的物理和营养支撑，不同土壤对农作物的支撑能力存在差异。这种差异由不同土壤的理化性质和肥力水平决定。对土壤理化性质和肥力水平的评估将有助于农业生产者因地制宜地进行农事操作、帮助农业投资者做出物有所值的估价。灌溉用水的质量是决定植物生长的关键因素，对其质量进行检测有助于农业生产者和投资人更有目的性的进行田间管理和规避终端农产品受到污染的风险。生长季节中植物组织中重要元素的检测将有助于农业生产者及时地发现潜在的某种元素的缺乏，适时针对性的补充化肥，以挽回产量和质量的损失。'
  },
  startCheckTap: function () {
    wx.navigateTo({
      url: '../selectPlan/selectPlan'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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