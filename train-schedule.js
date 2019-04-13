// Steps to complete:

// 1. Initialize Firebase
 

// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyBV-u0MTDeupteRaYnrFU9IJo9IqNzK_D8",
  authDomain: "gtlol-ff2ff.firebaseapp.com",
  databaseURL: "https://gtlol-ff2ff.firebaseio.com",
  projectId: "gtlol-ff2ff",
  storageBucket: "gtlol-ff2ff.appspot.com",
  messagingSenderId: "496733655624"
};

firebase.initializeApp(config);
var database = firebase.database();

var frequence= 0;
firstTraintime = 0;

var dt = new Date();
document.getElementById("current-time").innerHTML = dt.toLocaleString();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
 
  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTraintime = $("#start-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
  
  var currentTime = moment();

   if (firstTraintime > currentTime)
   {
     alert("The start time can't be > current time");
   }
  // Creates local "temporary" object for holding employee data
    var NewTrain = {
      name: trainName,
      newDest: destination,
      frequency: frequency,
      start: firstTraintime,
    
  };
   
  // Uploads employee data to the database
    database.ref().push(NewTrain);

    // Logs everything to console
    console.log(NewTrain.name);
    console.log(NewTrain.newDest);
    console.log(NewTrain.start);
    console.log(NewTrain.frequency);
    
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");


    firstTraintime = NewTrain.start;

});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().newDest;
    var trainStart = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().frequency;
    
    var nextTrain = childSnapshot.val().nextTrain;
    var minAway = childSnapshot.val().tMinutesTillTrain;
    var minAway = childSnapshot.val().tMinutesTillTrain
    
    // Log Train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainStart);
    console.log(trainFrequency);
    console.log(minAway);
    
    //convert the time

    var firstTimeConverted = moment(trainStart, "HH:mm ").subtract(1, "years");
    console.log(firstTimeConverted);
    console.log("first time"+ firstTimeConverted);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm "));

    // Difference between the times
    console.log("frequence" + trainFrequency);
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm "));

    // Create the new row
    var newRow = $("<tr>").append(
     
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainFrequency),
      $("<td>").text(moment(nextTrain).format("HH:mm")),
      $("<td>").text(tMinutesTillTrain),
      $("<button>").text("update"),
      $("<button>").text("remove"),
  
    );

    $("#remove").on("click", function(event) {
      $(this).closest("tr").remove(newRow);
      return false;
    });
    


  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
  
  //$("#employee-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" + empRate + 
  //"</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" +  tMinutesTillTrain+ "</td></tr>");
 
});

