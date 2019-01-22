var readData = require("../../data/read-data.js");

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
    this.setData({
      data: readData.readData
    })
  },

  view: function(value) {
    var readId = value.currentTarget.dataset.readid;
    wx.navigateTo({
      url: "read-details/read-details?id=" + readId,
    })
  },

  onSwiperTap: function (value) {
    var readId = value.target.dataset.readid;
    wx.navigateTo({
      url: "read-details/read-details?id=" + readId,
    })
  }
})