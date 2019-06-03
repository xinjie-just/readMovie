// pages/movie/movie.js
var stars = require("../../utils/util.js");
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

    this.getMovieListRequest(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieListRequest(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListRequest(top250Url, "top250", "豆瓣Top250");
  },

  getMovieListRequest(url, setTitle, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      success: function (res) {
        that.processMoviewData(res.data, setTitle, categoryTitle);
      },
      fail: function (error) {
      }
    })
  },

  processMoviewData(data, setTitle, categoryTitle) {
    var movies = [], movieItem = {};
    for (var prop in data.subjects) {
      var subject = data.subjects[prop];
      movieItem = {
        id: subject.id,
        title: subject.title,
        images: subject.images.large,
        average: subject.rating.average,
        stars: stars.convertToStarArray(subject.rating.stars)
      }
      movies.push(movieItem);
      movieItem = {};
    }
    var readyData = {};
    readyData[setTitle] = {
      movies: movies,
      categoryTitle: categoryTitle
    };
    this.setData(readyData);
  }
})