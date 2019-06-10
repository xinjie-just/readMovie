// pages/movie/more-movie/more-movie.js
var stars = require("../../../utils/util.js");
var AppData = getApp();
Page({

  data: {
    movies: [],
    baseUrl: AppData.globalData.doubanbase,  // 豆瓣基础地址
    categoryUrl: "",  // 电影类型加载数据的 url
    nextIndex: 0,  // 第一次取数据的开始索引
    isFirstLoading: true  // 是首次加载
  },

  onScroll(event) {
    var nextUrl = this.data.categoryUrl + "?start=" + this.data.nextIndex + "&count=20";
    this.getMovieListRequest(nextUrl);
    wx.showNavigationBarLoading();
  },

  onPullDownRefresh(event) {
    var refreshUrl = this.data.categoryUrl + "?start=0&count=20";
    this.getMovieListRequest(refreshUrl);
    this.data.movies = [];
    this.data.isFirstLoading = true;
    wx.showNavigationBarLoading();
  },

  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.category
    });

    switch (options.category) {
      case "正在热映":
        this.data.categoryUrl = this.data.baseUrl + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        this.data.categoryUrl = this.data.baseUrl + "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        this.data.categoryUrl = this.data.baseUrl + "/v2/movie/top250";
        break;
    }

    this.getMovieListRequest(this.data.categoryUrl);
  },

  getMovieListRequest(url) {
    var that = this;
    wx.request({
      url: url,
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      success: function(res) {
        that.processMoviewData(res.data);
      },
      fail: function(error) {}
    })
  },

  processMoviewData(data) {
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
    var totalMovie = [];
    if (this.data.isFirstLoading) {
      totalMovie = movies;
      this.data.isFirstLoading = false;
    } else {
      totalMovie = this.data.movies.concat(movies);
    }

    this.setData({
      movies: totalMovie
    });
    console.log(movies);
    this.data.nextIndex += 20;

    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  movieDetail(event) {
    var id = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-details/movie-details?id=' + id,
    })
  },

  onReady: function() {}

})