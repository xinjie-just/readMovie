Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  startMiniProgram: function(event) {
    // wx.redirectTo({ // 页面重定向到指定页面
    //   url: "/pages/read/read",
    // })

    wx.switchTab({ // 页面重定向到指定页面
      url: "/pages/read/read",
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log("welcome onLoad");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // console.log("welcome onReady");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // console.log("welcome onShow");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    // console.log("welcome onHide");    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    // console.log("welcome onUnload");    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})