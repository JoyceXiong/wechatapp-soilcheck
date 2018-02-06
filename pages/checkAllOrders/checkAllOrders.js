// pages/checkAllOrders/checkAllOrders.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,  
    scrollHeight:0,
    allorders: {},
    showorders: {},
    _num:1,
    // 当前页
    pageNumber: 1,
    // 总页数
    totalPage: 1,
    isShow: false

  },
  navitoDetail: function (e) {
    // app.globalData.orderid = e.currentTarget.dataset.num
    wx.navigateTo({
      url: '../detailOrder/detailOrder?orderid=' + e.currentTarget.dataset.num,
    })
  },
  // 获取全部订单信息
  // 订单状态:['initial', 'expired', 'paid', 'examined', 'shipped', 'canceled', 'refunded']
  // examined, shipped都是已完成
  getAllOrders (cb) {
    const self = this
    self.isLoading = true
    self.setData({ _num: app.globalData.payCode})
    console.log("app.globalData.payCode:", app.globalData.payCode)
    var states = ''
    switch (app.globalData.payCode) {
      case 1:
        break
      case 2:
        states = 'states: ["initial"]'
        break
      case 3:
        states = 'states: ["paid"]'
        break
      case 4:
        states = 'states: ["shipped", "examined"]'
        break
      case 5:
        states = 'states: ["canceled"]'
        break

    }
    
    wx.request({
      url: 'https://api-dev.daqiuyin.com/api',
      data: {
        "service": "portal",
        "method": "POST",
        "path": "/portal/ql",
        "data": {
          "query": "{ myOrders(page:1, limit:10," + states +"){total, page, orders{id, user{id, nick}, examine_soil{abbr, display}, examine_stroma{abbr, display}, quantity, amount, status, ctime, ptime }}}"
        }      
      },
      method: 'POST',
      header: {
        'content-type': 'application/json', // 默认值
        'x-auth-token': app.globalData.token
      },
      success: function (res) {
        if (res.data.data.myOrders.orders && res.data.data.myOrders.orders.length>0){
          var arr = res.data.data.myOrders.orders
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
            isShow: false,
            totalPage: Math.ceil(res.data.data.myOrders.total / 10)
          })
          // switch(app.globalData.payCode){
          //   case 1:
          //     if (tmparr.length > 0){
          //       self.setData({
          //         showorders: tmparr,
          //         isShow: false
          //       })
          //     }else {
          //       self.setData({
          //         showorders: arrInitail,
          //         isShow: true
          //       })
          //     }
          //     break
          //   case 2:
          //     var arrInitail = tmparr.filter(x => x.status == 'initial')
          //     if (arrInitail.length > 0) {
          //       self.setData({
          //         showorders: arrInitail,
          //         isShow: false
          //       })
          //     } else {
          //       self.setData({
          //         showorders: arrInitail,
          //         isShow: true
          //       })
          //     }
          //     break
          //   case 3:
          //     var arrPaid = tmparr.filter(x => x.status == 'paid')
          //     if (arrPaid.length > 0) {
          //       self.setData({
          //         showorders: arrPaid,
          //         isShow: false
          //       })
          //     } else {
          //       self.setData({
          //         showorders: arrPaid,
          //         isShow: true
          //       })
          //     }
          //     break
          //   case 4:
          //     var arrShipped = tmparr.filter(x => x.status == 'shipped')
          //     if (arrShipped.length > 0) {
          //       self.setData({
          //         showorders: arrShipped,
          //         isShow: false
          //       })
          //     } else {
          //       self.setData({
          //         showorders: arrShipped,
          //         isShow: true
          //       })
          //     }
          //     break
          //   case 5: 
          //     var arrCanceled = tmparr.filter(x => x.status == 'canceled')
          //     if (arrCanceled.length > 0) {
          //       self.setData({
          //         showorders: arrCanceled,
          //         isShow: false
          //       })
          //     } else {
          //       self.setData({
          //         showorders: arrCanceled,
          //         isShow: true
          //       })
          //     }
          //     break
          // }

        }else {
          self.setData({isShow:true})
        }
        
      },
      complete:function(){
        if (self.isLoading){
          // wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
          // wx.hideLoading()
          self.isLoading = false;
        }
        if (cb){
          cb();
        }
      }
    })
  },
  showAll: function (e) {
    var self = this
    this.setData({
      _num: e.target.dataset.num,
      showorders:[]
    })
    app.globalData.payCode = e.target.dataset.num
    // var arrOrders = this.data.allorders
    // if (arrOrders.length > 0){
    //   this.setData({
    //     showorders: arrOrders,
    //     isShow: false
    //   })
    // }
    wx.request({
      url: 'https://api-dev.daqiuyin.com/api',
      data: {
        "service": "portal",
        "method": "POST",
        "path": "/portal/ql",
        "data": {
          "query": "{ myOrders(page:1, limit:10){total, page, orders{id, user{id, nick}, examine_soil{abbr, display}, examine_stroma{abbr, display}, quantity, amount, status, ctime, ptime }}}"
        }
      },
      method: 'POST',
      header: {
        'content-type': 'application/json', // 默认值
        'x-auth-token': app.globalData.token
      },
      success: function (res) {
        var tmparr = []
        if (res.data.data.myOrders.orders && res.data.data.myOrders.orders.length > 0) {
          var arr = res.data.data.myOrders.orders
          tmparr = arr.map(x => ({
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
            isShow: false,
            allorders: tmparr,
            showorders: tmparr,
            totalPage: Math.ceil(res.data.data.myOrders.total / 10)
          })

        } else {
          self.setData({
            isShow: true,
            showorders: tmparr
          })
        }

      }
    })
    
  },
  showPaying: function (e) {
    var self = this
    this.setData({
      _num: e.target.dataset.num,
      showorders: []
    })
    app.globalData.payCode = e.target.dataset.num
    // var arrOrders = this.data.allorders
    // if (arrOrders.length > 0) {
    //   arrOrders = arrOrders.filter(x => x.status == 'initial')
    //   if (arrOrders.length > 0) {
    //     this.setData({
    //       isShow: false,
    //       showorders: arrOrders
    //     })
    //   } else {
    //     this.setData({
    //       isShow: true,
    //       showorders: arrOrders
    //     })
    //   }
    // }
    wx.request({
      url: 'https://api-dev.daqiuyin.com/api',
      data: {
        "service": "portal",
        "method": "POST",
        "path": "/portal/ql",
        "data": {
          "query": "{ myOrders(page:1, limit:10,states:[\"initial\"]){total, page, orders{id, user{id, nick}, examine_soil{abbr, display}, examine_stroma{abbr, display}, quantity, amount, status, ctime, ptime }}}"
        }
      },
      method: 'POST',
      header: {
        'content-type': 'application/json', // 默认值
        'x-auth-token': app.globalData.token
      },
      success: function (res) {
        var tmparr = []
        if (res.data.data.myOrders.orders && res.data.data.myOrders.orders.length > 0) {
          var arr = res.data.data.myOrders.orders
          tmparr = arr.map(x => ({
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
            isShow: false,
            showorders: tmparr,
            totalPage: Math.ceil(res.data.data.myOrders.total / 10)
          })

        }else {
          self.setData({
            isShow: true,
            showorders: tmparr
          })
        }

      }
    })
    
  },
  showchecking: function (e) {
    var self = this
    this.setData({
      _num: e.target.dataset.num,
      showorders: []
    })
    app.globalData.payCode = e.target.dataset.num
    // var arrOrders = this.data.allorders
    // if (arrOrders.length > 0) {
    //   arrOrders = arrOrders.filter(x => x.status == 'paid')
    //   if (arrOrders.length > 0) {
    //     isShow: false,
    //     this.setData({
    //       isShow: false,
    //       showorders: arrOrders
    //     })
    //   } else {
    //     this.setData({
    //       isShow: true,
    //       showorders: arrOrders
    //     })
    //   }
    // }
    wx.request({
      url: 'https://api-dev.daqiuyin.com/api',
      data: {
        "service": "portal",
        "method": "POST",
        "path": "/portal/ql",
        "data": {
          "query": "{ myOrders(page:1, limit:10,states:[\"paid\"]){total, page, orders{id, user{id, nick}, examine_soil{abbr, display}, examine_stroma{abbr, display}, quantity, amount, status, ctime, ptime }}}"
        }
      },
      method: 'POST',
      header: {
        'content-type': 'application/json', // 默认值
        'x-auth-token': app.globalData.token
      },
      success: function (res) {
        var tmparr = []
        if (res.data.data.myOrders.orders && res.data.data.myOrders.orders.length > 0) {
          var arr = res.data.data.myOrders.orders
          tmparr = arr.map(x => ({
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
            isShow: false,
            showorders: tmparr,
            totalPage: Math.ceil(res.data.data.myOrders.total / 10)
          })

        } else {
          self.setData({
            isShow: true,
            showorders: tmparr
          })
        }

      }
    })
    
  },
  showFinished: function  (e) {
    var self = this
    this.setData({
      _num: e.target.dataset.num,
      showorders: []
    })
    app.globalData.payCode = e.target.dataset.num
    // var arrOrders = this.data.allorders
    // if (arrOrders.length > 0) {
    //   var shippedArr = arrOrders.filter(x => x.status == 'shipped')
    //   var examinedArr = arrOrders.filter(x => x.status == 'examined')
    //   arrOrders = shippedArr.concat(examinedArr)
      
    //   if (arrOrders.length > 0) {
        
    //     this.setData({
    //       isShow: false,
    //       showorders: arrOrders
    //     })
    //   } else {
    //     this.setData({
    //       isShow: true,
    //       showorders: arrOrders
    //     })
    //   }
    // }
    wx.request({
      url: 'https://api-dev.daqiuyin.com/api',
      data: {
        "service": "portal",
        "method": "POST",
        "path": "/portal/ql",
        "data": {
          "query": "{ myOrders(page:1, limit:10,states:[\"examined\",\"shipped\"]){total, page, orders{id, user{id, nick}, examine_soil{abbr, display}, examine_stroma{abbr, display}, quantity, amount, status, ctime, ptime }}}"
        }
      },
      method: 'POST',
      header: {
        'content-type': 'application/json', // 默认值
        'x-auth-token': app.globalData.token
      },
      success: function (res) {
        var tmparr = []
        if (res.data.data.myOrders.orders && res.data.data.myOrders.orders.length > 0) {
          var arr = res.data.data.myOrders.orders
          tmparr = arr.map(x => ({
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
            isShow: false,
            showorders: tmparr,
            totalPage: Math.ceil(res.data.data.myOrders.total / 10)
          })

        } else {
          self.setData({
            isShow: true,
            showorders: tmparr
          })
        }

      }
    })
    
  },
  showClosed: function (e) {
    var self = this
    this.setData({
      _num: e.target.dataset.num,
      showorders: []
    })
    app.globalData.payCode = e.target.dataset.num
    // var arrOrders = this.data.allorders
    // if (arrOrders.length > 0){
    //   arrOrders = arrOrders.filter(x => x.status == 'canceled')
    //   if (arrOrders.length > 0) {
        
    //     this.setData({
    //       isShow: false,
    //       showorders: arrOrders
    //     })
    //   } else {
    //     this.setData({
    //       isShow: true,
    //       showorders: arrOrders
    //     })
    //   }
    // }
    wx.request({
      url: 'https://api-dev.daqiuyin.com/api',
      data: {
        "service": "portal",
        "method": "POST",
        "path": "/portal/ql",
        "data": {
          "query": "{ myOrders(page:1, limit:10,states:[\"canceled\"]){total, page, orders{id, user{id, nick}, examine_soil{abbr, display}, examine_stroma{abbr, display}, quantity, amount, status, ctime, ptime }}}"
        }
      },
      method: 'POST',
      header: {
        'content-type': 'application/json', // 默认值
        'x-auth-token': app.globalData.token
      },
      success: function (res) {
        var tmparr = []
        if (res.data.data.myOrders.orders && res.data.data.myOrders.orders.length > 0) {
          var arr = res.data.data.myOrders.orders
          tmparr = arr.map(x => ({
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
            isShow: false,
            showorders: tmparr,
            totalPage: Math.ceil(res.data.data.myOrders.total / 10)
          })

        } else {
          self.setData({
            isShow: true,
            showorders: tmparr
          })
        }

      }
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.isLoading = false;
    // this.setScrollViewHeight();
    // this.getAllOrders() 
  },

  setScrollViewHeight() {
    var self = this;
    //获取header 高度
    var query = wx.createSelectorQuery()
    query.select('.header').boundingClientRect()
    query.exec(function (res) {
      var headerHeight = res[0].height
      
      wx.getSystemInfo({
        success: function (res2) {
          //scroll高度
          self.setData({
            scrollHeight: res2.windowHeight - headerHeight
          })
        }
      })
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
    //this.refreshData()
    this.getAllOrders()
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
    console.log("pulldown-paycode:", app.globalData.payCode)
    this.getAllOrders()
    //this.refreshData();
    // 
    
    //

    // setTimeout(function () {
    //   // complete
    //   wx.hideNavigationBarLoading() //完成停止加载
    //   wx.stopPullDownRefresh() //停止下拉刷新
    //   wx.hideLoading()
    // }, 1500);
  },

  refreshData:function(){
    
    var that = this;
    delete that.data.allorders
    delete that.data.showorders 
    that.isLoading = true;
    // wx.showNavigationBarLoading() //在标题栏中显示加载
    // wx.showLoading({
    //   title: '加载中...',
    // })
    // this.getAllOrders(function () {
    //   var arrOrders = self.data.allorders
    //   if (arrOrders.length > 0) {
    //     switch (app.globalData.payCode+'') {
    //       case '1':
    //         break
    //       case '2':
    //         arrOrders = arrOrders.filter(x => x.status == 'initial')
    //         break
    //       case '3':
    //         arrOrders = arrOrders.filter(x => x.status == 'paid')
    //         break
    //       case '4':
    //         var shippedOrders = arrOrders.filter(x => x.status == 'shipped')
    //         var examinedOrders = arrOrders.filter(x => x.status == 'examined')
    //         arrOrders = shippedOrders.concat(examinedOrders)
    //         break
    //       case '5':
    //         arrOrders = arrOrders.filter(x => x.status == 'canceled')
    //         break
    //     }
    //     if (arrOrders.length > 0) {

    //       self.setData({
    //         isShow: false,
    //         showorders: arrOrders
    //       })
    //     } else {
    //       self.setData({
    //         isShow: true,
    //         showorders: arrOrders
    //       })
    //     }
    //   }
    // });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var self = this;
    // 当前页+1
    var pageNumber = self.data.pageNumber + 1;

    self.setData({
      pageNumber: pageNumber,
    })
    var showlist = self.data.showorders
    var states =''
    switch (app.globalData.payCode){
      case 1:
        break
      case 2:
        states = 'states: ["initial"]'
        break
      case 3:
        states = 'states: ["paid"]'
        break
      case 4:
        states = 'states: ["shipped", "examined"]'
        break 
      case 5:
        states = 'states: ["canceled"]' 
        break

    }
    if (pageNumber <= self.data.totalPage) {
      wx.showLoading({
        title: '加载中',
      })
      
      //wx.hideLoading()
      // 请求后台，获取下一页的数据。
      wx.request({
        url: 'https://api-dev.daqiuyin.com/api',
        data: {
          "service": "portal",
          "method": "POST",
          "path": "/portal/ql",
          "data": {
            "query": "{ myOrders(page:" + pageNumber + ", limit:10," + states +"){total, page, orders{id, user{id, nick}, examine_soil{abbr, display}, examine_stroma{abbr, display}, quantity, amount, status, ctime, ptime }}}"
          }
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'x-auth-token': app.globalData.token
        },
        success: function (res) {
          var tmparr = []
          if (res.data.data.myOrders.orders && res.data.data.myOrders.orders.length > 0) {
            var arr = res.data.data.myOrders.orders
            tmparr = arr.map(x => ({
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
            // 将新获取的数据 tmparr，concat到前台显示的showorders中
            self.setData({
              showorders: self.data.showorders.concat(tmparr)
            })
            
          }
          wx.hideLoading()
          
        },
        fail: function (res) {
          wx.hideLoading()
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})