function convertToStarArray(stars) {
  var starsArr = [];
  stars = stars.toString().slice(0, 1);
  for (var i = 1; i <= 5; i++) {
    if (i <= stars) {
      starsArr.push(1);
    } else {
      starsArr.push(0);
    }
  }
  return starsArr;
}

module.exports = {
  convertToStarArray: convertToStarArray
}