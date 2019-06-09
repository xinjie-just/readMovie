// pages/movie/movie.js
var stars = require("../../utils/util.js");
var AppData = getApp(); // 获取小程序App实例
Page({

  data: {
    baseUrl: AppData.globalData.doubanbase,
    inTheaters: {},
    comingSoon: {},
    top250: {},
    searchResult: {},
    isShowSearchPage: false
  },

  onLoad: function(options) {
    var inTheatersUrl = this.data.baseUrl +
      "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = this.data.baseUrl +
      "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = this.data.baseUrl +
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
      success: function(res) {
        that.processMoviewData(res.data, setTitle, categoryTitle);
      },
      fail: function(error) {}
    })
  },

  processMoviewData(data, setTitle, categoryTitle) {
    var movies = [],
      movieItem = {};
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
  },

  onMoreTap(event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category
    });
  },

  focusHandle(event) {
    this.setData({
      isShowSearchPage: true
    });
  },

  cancelSearchPage(event) {
    this.setData({
      isShowSearchPage: false
    });
  },

  searchComplete(event) {
    console.log(event.detail.value);
    var searchContent = event.detail.value;
    var searchUrl = this.data.baseUrl + '/v2/movie/search?q=' + searchContent;
    this.getMovieListRequest(searchUrl, "searchResult", "");
  },

  movieDetail(event) {
    var id = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-details/movie-details?id=' + id,
    })
  }
})