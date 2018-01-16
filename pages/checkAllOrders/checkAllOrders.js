// pages/checkAllOrders/checkAllOrders.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allorders: {},
    showorders: {},
    _num:1,
    // 当前页
    //pageNumber: 1,
    // 总页数
    //totalPage: 100,
    isShow: false

  },
  navitoDetail: function (e) {
    console.log("navitoDetail:",e)
    // app.globalData.orderid = e.currentTarget.dataset.num
    wx.navigateTo({
      url: '../detailOrder/detailOrder?orderid=' + e.currentTarget.dataset.num,
    })
  },
  // 获取全部订单信息
  getAllOrders () {
    console.log("app.globalData.payCode:", app.globalData.payCode)
    const self = this
    self.setData({ _num: app.globalData.payCode})
    console.log("app.globalData.token:", app.globalData.token)
    wx.request({
      url: 'https://api-dev.daqiuyin.com/api',
      data: {
        "service": "portal",
        "method": "POST",
        "path": "/portal/ql",
        "data": {
          "query": "{ myOrders{id, examine_soil{abbr, display}, examine_stroma{abbr, display}, quantity, amount, status, ctime, ptime }}"
        }      
      },
      method: 'POST',
      header: {
        'content-type': 'application/json', // 默认值
        'x-auth-token': app.globalData.token
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.data.myOrders && res.data.data.myOrders.length>0){
          var arr = res.data.data.myOrders
          var tmparr = arr.map(x => ({
            id: x.id,
            examine_soil: x.examine_soil,
            examine_stroma: x.examine_stroma,
            amount: x.amount,
            ctime: new Date(x.ctime).toLocaleString(),
            ptime: new Date(x.ptime).toLocaleString(),
            quantity: x.quantity,
            status: x.status
          }
          ))
          self.setData({
            allorders: tmparr,
            showorders: tmparr,
            isShow: false
          })
          switch(app.globalData.payCode){
            case 1:
              console.log("paycode:", app.globalData.payCode)
              if (tmparr.length > 0){
                self.setData({
                  showorders: tmparr,
                  isShow: false
                })
              }else {
                self.setData({
                  showorders: arrInitail,
                  isShow: true
                })
              }
              break
            case 2:
              console.log("paycode:", app.globalData.payCode)
              var arrInitail = tmparr.filter(x => x.status == 'initial')
              if (arrInitail.length > 0) {
                self.setData({
                  showorders: arrInitail,
                  isShow: false
                })
              } else {
                self.setData({
                  showorders: arrInitail,
                  isShow: true
                })
              }
              break
            case 3:
              console.log("paycode:", app.globalData.payCode)
              var arrPaid = tmparr.filter(x => x.status == 'paid')
              if (arrPaid.length > 0) {
                self.setData({
                  showorders: arrPaid,
                  isShow: false
                })
              } else {
                self.setData({
                  showorders: arrPaid,
                  isShow: true
                })
              }
              break
            case 4:
              console.log("paycode:", app.globalData.payCode)
              var arrShipped = tmparr.filter(x => x.status == 'shipped')
              if (arrShipped.length > 0) {
                self.setData({
                  showorders: arrShipped,
                  isShow: false
                })
              } else {
                self.setData({
                  showorders: arrShipped,
                  isShow: true
                })
              }
              break
            case 5: 
              console.log("paycode:", app.globalData.payCode)
              var arrCanceled = tmparr.filter(x => x.status == 'canceled')
              if (arrCanceled.length > 0) {
                self.setData({
                  showorders: arrCanceled,
                  isShow: false
                })
              } else {
                self.setData({
                  showorders: arrCanceled,
                  isShow: true
                })
              }
              break
          }

        }else {
          self.setData({isShow:true})
        }
        
      }
    })
  },
  showAll: function (e) {
    this.setData({
      _num: e.target.dataset.num
    })
    var arrOrders = this.data.allorders
    if (arrOrders.length > 0){
      this.setData({
        showorders: arrOrders,
        isShow: false
      })
    }
    
  },
  showPaying: function (e) {
    this.setData({
      _num: e.target.dataset.num
    })
    var arrOrders = this.data.allorders
    if (arrOrders.length > 0) {
      arrOrders = arrOrders.filter(x => x.status == 'initial')
      if (arrOrders.length > 0) {
        this.setData({
          isShow: false,
          showorders: arrOrders
        })
      } else {
        console.log(arrOrders.length)
        this.setData({
          isShow: true,
          showorders: arrOrders
        })
      }
    }
    
  },
  showchecking: function (e) {
    this.setData({
      _num: e.target.dataset.num
    })
    var arrOrders = this.data.allorders
    if (arrOrders.length > 0) {
      arrOrders = arrOrders.filter(x => x.status == 'paid')
      console.log("paidArr:",arrOrders)
      if (arrOrders.length > 0) {
        isShow: false,
        this.setData({
          isShow: false,
          showorders: arrOrders
        })
      } else {
        this.setData({
          isShow: true,
          showorders: arrOrders
        })
      }
    }
    
  },
  showFinished: function  (e) {
    this.setData({
      _num: e.target.dataset.num
    })
    var arrOrders = this.data.allorders
    if (arrOrders.length > 0) {
      arrOrders = arrOrders.filter(x => x.status == 'shipped')
      if (arrOrders.length > 0) {
        isShow: false,
        this.setData({
          showorders: arrOrders
        })
      } else {
        this.setData({
          isShow: true,
          showorders: arrOrders
        })
      }
    }
    
  },
  showClosed: function (e) {
    this.setData({
      _num: e.target.dataset.num
    })
    var arrOrders = this.data.allorders
    if (arrOrders.length > 0){
      arrOrders = arrOrders.filter(x => x.status == 'canceled')
      if (arrOrders.length > 0) {
        isShow: false,
        this.setData({
          showorders: arrOrders
        })
      } else {
        this.setData({
          isShow: true,
          showorders: arrOrders
        })
      }
    }
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllOrders() 
     
    
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.showLoading({
      title: '玩命加载中。。。',
    })
    this.getAllOrders()
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
      wx.hideLoading()
    }, 1500);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // var self = this;
    // // 当前页+1
    // var pageNumber = self.data.pageNumber + 1;

    // self.setData({
    //   pageNumber: pageNumber,
    // })

    // if (pageNumber <= self.data.totalPage) {
    //   wx.showLoading({
    //     title: '加载中',
    //   })
    //   self.setData({
    //     showlist: self.data.showorders
    //   })
    //   wx.hideLoading()
      // 请求后台，获取下一页的数据。
      // wx.request({
      //   url: '',
      //   data: {
      //     pageNumber: pageNumber,
      //   },
      //   success: function (res) {
      //     wx.hideLoading()
      //     // 将新获取的数据 res.data.list，concat到前台显示的showlist中即可。
      //     self.setData({
      //       showlist: self.data.showlist.concat(res.data.list)
      //     })
      //   },
      //   fail: function (res) {
      //     wx.hideLoading()
      //   }
      // })
    //}
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})