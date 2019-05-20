const express = require('express');
const friendsList = require('../data/friends');
const app = express();

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    return res.json(friendsList);
  });
};
app.post("/api/friends", function(req, res) {
  let totalDifference = 0;
  let bestMatch = {
    name: "",
    photo: "",
    friendDifference: 1000
  };
  let userData = req.body;
  let userName = userData.name;
  let userScores = userData.scores;

  let b = userScores.map(function(item) {
    return parseInt(item, 10);
  });
  userData = {
    name: req.body.name,
    photo: req.body.photo,
    scores: b
  };

  log("Name: " + userName);
  log("User Score: " + userScores);
  
  let sum = b.reduce(( a, b ) => a + b, 0)
  log("Sum of user's score: " + sum);
  log("Best soul match difference: " + bestMatch.friendDifference);
  log("*******************************************************************");

  for (var i = 0; i < friendsList.length; i++) {
    log(friends[i].name);
    totalDifference = 0;
    log("Total Difference " + totalDifference);
    log("Best match friend difference " + bestMatch.friendDifference);

    let bMatchScore = friends[i].scores.reduce(( a, b ) => a + b, 0);
    log("Total friend score " + bMatchScore);
    totalDifference += Math.abs(sum - bMatchScore);
    log("----->" + totalDifference);

    if (totalDifference <= bestMatch.friendDifference) {
      bestMatch.name = friends[i].name;
      bestMatch.photo = friends[i].photo;
      bestMatch.friendDifference = totalDifference; 
    }
    log( totalDifference + " Total Difference");
  }

  log(bestMatch);
  friends.push(userData);
  log("New User Added");
  log(userData);
  res.json(bestMatch);
});
