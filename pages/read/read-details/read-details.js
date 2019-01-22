var readData = require("../../../data/read-data.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.setData({
      data: readData.readData[id],
      readId: id
    });

    // var collectList = {0: true, 1: true, 2: false, 3: false};
    var collectList = wx.getStorageSync("collectList");
    if (collectList) {
      var collected = collectList[id];
      this.setData({
        collected: collected
      });
    }
    else {
      collectList = {};
      collectList[id] = false;
      wx.setStorageSync("collectList", collectList);
    }
  },

  // 收藏
  onCollect: function(event) {
    var collectList = wx.getStorageSync("collectList");
    var collected = collectList[this.data.readId];
    collected = !collected;
    collectList[this.data.readId] = collected;
    wx.setStorageSync("collectList", collectList);
    this.setData({
      collected: collected
    });

    wx.showToast({
      title: collected ? "收藏成功" : "取消收藏成功",
      icon: 'success',
      duration: 2000
    });
  },

  // 分享
  onShare: function(event) {
    var items = ["分享到朋友圈", "转发给好友", "分享到微博", "分享到QQ"];
    wx.showActionSheet({
      itemList: items,
      success(res) {
        console.log("用户点击了" + items[res.tapIndex])
      },
      fail(res) {
        console.log(res.errMsg)
      }
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