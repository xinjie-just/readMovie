var app = getApp();
var util = require("../../../utils/util.js");
Page({
  data: {
    movie: {},
    baseUrl: app.globalData.doubanbase
  },

  onLoad: function (options) {
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
        that.resetDetailsData(res.data);
      },
      fail: function (error) { }
    })
  },

  resetDetailsData(value) {
    if (!value) {
      return;
    }
    var movie = {
      id: value.id,
      title: value.title,
      countries: value.countries.join(' · '),
      date: value.year,
      wishCount: value.wish_count,
      reviewsCount: value.reviews_count,
      images: value.images ? value.images.large : "",
      originalTitle: value.original_title || "",
      stars: util.convertToStarArray(value.rating.stars),
      score: value.rating.average,
      directors: util.directorsToString(value.directors),
      casts: util.castsToString(value.casts),
      genres: value.genres.join("、"),
      summary: value.summary || ""
    };
    this.setData({
      movie: movie
    });
  },

  viewMoviePostImg: function (e) {
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  },

  onReady: function (options) {
    wx.setNavigationBarTitle({
      title: this.data.movie.title || "电影详情"
    });
  }

})