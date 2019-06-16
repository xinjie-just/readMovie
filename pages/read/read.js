var readData = require("../../data/read-data.js");

Page({
  data: {
    
  },

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