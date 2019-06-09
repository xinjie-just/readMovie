var app = getApp();
Page({

  data: {
    baseUrl: app.globalData.doubanbase
  },

  onLoad: function(options) {
    var movieId = options.id;
    var movieDetailsUrl = this.data.baseUrl + "/v2/movie/subject/" + movieId;
    this.getMovieDetailsRequest(movieDetailsUrl);
  },

  getMovieDetailsRequest(url) {
    var that = this;
    wx.request({
      url: url,
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      success: function (res) {
        console.log(res);
      },
      fail: function (error) { }
    })
  },

})