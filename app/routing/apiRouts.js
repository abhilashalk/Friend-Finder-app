// Linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friends list and user input.
// ===============================================================================
var express = require("express");
//creating an "express" server
var app = express();

var friendsArray = require("../data/friends");

module.exports = function (app) {
    // API GET Requests 
    app.get("/api/friends", function (req, res) {
        res.json(friendsArray);
    });
    // app.get("/api/friends", function (req, res) {
    //     res.json(userArray);
    // });

    app.post('/api/friends', function (req, res) {
        //grabs the user scores to compare with friends in friends array
        var userScores = req.body.scores;
        var scoreForMatching = [];
        var bestFriend = 0;


        //for loop through friends array 
        for (var i = 0; i < friendsArray.length; i++) {
            var scoresDiff = 0;
            //for loop through each scores for comparison with userscore
            for (var j = 0; j < userScores.length; j++) {
                scoresDiff += (Math.abs(parseInt(friendsArray[i].scores[j]) - parseInt(userScores[j])));
                console.log(scoresDiff);
            }
            //push results into scoresArray
            scoreForMatching.push(scoresDiff);
            console.log(scoreForMatching);
        }

        //after all friends are compared, find least difference
        // for (var i = 0; i < scoreForMatching.length; i++) {
        //     if (scoreForMatching[i] <= scoreForMatching[bestFriend]) {
        //         bestFriend = i;
        //         console.log(bestFriend);
        //     }
        // }
        var bestFriendScore = (Math.min.apply(Math, scoreForMatching));
        console.log(bestFriendScore);
        var index = (scoreForMatching.indexOf(bestFriendScore));

        var bf = (friendsArray[index]);
        res.json(bf);
        console.log("Your Best Friend:")
        console.log(bf)
        //add user inputs to friends array
        friendsArray.push(req.body);

    });

};