function convertToStarArray(stars) {
  var starsArr = [];
  stars = stars.toString().slice(0, 1);
  for (var i = 1; i <= 5; i++) {
    starsArr.push(i <= stars);
  }
  return starsArr;
}

module.exports = {
  convertToStarArray: convertToStarArray
}