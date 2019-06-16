function convertToStarArray(stars) {
  var starsArr = [];
  stars = stars.toString().slice(0, 1);
  for (var i = 1; i <= 5; i++) {
    starsArr.push(i <= stars);
  }
  return starsArr;
}

function directorsToString(directors) {
  if (directors.length) {
    var directorsArr = [];
    for (var prop in directors) {
      directorsArr.push(directors[prop].name);
    }
  }
  return directorsArr.join(" / ");
}

function castsToString(casts) {
  if (casts.length) {
    var castsArr = [{
      avatars: "",
      name: ""
    }];
    for (var prop in casts) {
      castsArr.push(casts[prop]);
    }
  }
  return casts;
}

module.exports = {
  convertToStarArray: convertToStarArray,
  directorsToString: directorsToString,
  castsToString: castsToString
}