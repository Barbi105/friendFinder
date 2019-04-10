var friends = require("../data/friends");

module.exports = function (app) {
    // routes to get api results
 
    app.get("/api/friends", function (req, res) {
        return res.json(friends);
    });


  
    // handle incoming survey results 
    app.post("/api/friends", function (req, res) {
        
        // object ready for the friend match
        var match = {
            name: "",
            photo: "",
            matchScore: 100  
        };
        
        var newFriend = req.body;
        var newFriendScores = newFriend.scores;

        var totalDifference = 0;

        // compatibility 
        for(var i = 0; i < friends.length; i++){

            totalDifference = 0;

            for(var j = 0; j < friends[i].scores[j]; j++){
                totalDifference += Math.abs(parseInt(newFriendScores[j]) - parseInt(friends[i].scores[j]));

                if(totalDifference < match.matchScore){
                    // populate the match object
                    match.name = friends[i].name;
                    match.photo = friends[i].photo;
                    match.matchScore = totalDifference;
                }
            }
        }
        // add new person to the bank of available friends
        friends.push(newFriend);
        // send friendMatch
        res.json(match);
    });

};