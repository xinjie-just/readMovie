// pages/movie/movie.js
var AppData = getApp();  // 获取小程序App实例
Page({

  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {}
  },

  onLoad: function (options) {
    var inTheatersUrl = AppData.globalData.doubanbase +
    "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = AppData.globalData.doubanbase +
      "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = AppData.globalData.doubanbase +
      "/v2/movie/top250" + "?start=0&count=3";

    this.getMovieListRequest(inTheatersUrl, "inTheaters");
    this.getMovieListRequest(comingSoonUrl, "comingSoon");
    this.getMovieListRequest(top250Url, "top250");
  },

  getMovieListRequest(url, setTitle) {
    var that = this;
    wx.request({
      url: url,
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      success: function (res) {
        that.processMoviewData(res.data, setTitle);
      },
      fail: function (error) {
      }
    })
  },

  processMoviewData(data, setTitle) {
    var movies = [], movieItem = {};
    for (var prop in data.subjects) {
      movieItem.id = data.subjects[prop].id;
      movieItem.title = data.subjects[prop].title;
      movieItem.images = data.subjects[prop].images.large;
      movieItem.average = data.subjects[prop].rating.average;
      movies.push(movieItem);
      movieItem = {};
    }
    var readyData = {};
    readyData[setTitle] = {
      movies: movies
    };
    this.setData(readyData);
  }
})