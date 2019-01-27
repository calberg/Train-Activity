//Initialize firebase
var config = {
    apiKey: "AIzaSyCUvtYvTCdD7z3sxL5FQnsMcZWwRB2gdiA",
    authDomain: "train-activity-ae9ff.firebaseapp.com",
    databaseURL: "https://train-activity-ae9ff.firebaseio.com",
    projectId: "train-activity-ae9ff",
    storageBucket: "train-activity-ae9ff.appspot.com",
    messagingSenderId: "860651121156"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// Create an event handler for 'Submit' click
$("#add-train-button").on("click", function(){
    var train = {
        name: $("#train-name-input")
            .val()
            .trim(),
        destination: $("#destination-input")
            .val()
            .trim(),
        frequency: $("#firstTrain-input")
            .val()
            .trim(),
        minAway: $("#frequency-input")
            .val()
            .trim()
    }
    console.log(train);

    // Push obj to database
    database.ref().push(train)
    .catch(function(err) {
        console.log(err);
    });

});

// Add train input to the schedule 
function addTrainRow(train) {
    var start = train.start;
    console.log(start);
    var nextArrival = moment().diff(moment(start),"minutes");
    console.log(nextArrival);
    var newRow = $("#tbody").append(
        $("<td>").text(train.name),
        $("<td>").text(train.destination),
        $("<td>").text(train.frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(train.minAway),
    );
      // Append the new row to the table
    $("#train-table > tbody").append(newRow);
    };

//The callback function you specify will be called for each child in the DB
database.ref().on("child_added", function(snapshot) {
    var train = snapshot.val();
    console.log("child: ", train);
    addTrainRow(train);
});

//calculate when next train will arrive relative to current time using moment.js
var nextTrain = moment().endOf('day').fromNow();

//next train time minus current time 



