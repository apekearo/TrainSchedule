// Initialize Firebase
var config = {
    apiKey: "AIzaSyCYw_HEHQF3kOf9FSeN7lD0PPuc0UEDak8",
    authDomain: "train-schedule-b5c5c.firebaseapp.com",
    databaseURL: "https://train-schedule-b5c5c.firebaseio.com",
    projectId: "train-schedule-b5c5c",
    storageBucket: "train-schedule-b5c5c.appspot.com",
    messagingSenderId: "213950160475"
  };

firebase.initializeApp(config);

var database = firebase.database();

$("#addTrainBtn").on("click", function(event){
  event.preventDefault();

  var trainName = $("#train-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var trainTime = moment($("#time-input").val().trim(),"HH:mm").format("HH:mm");
  var freq = $("#freq-input").val().trim();

  var newTrain = {
    name: trainName,
    destination: destination,
    time: trainTime,
    frequency: freq
  };

  database.ref().push(newTrain);

  $("#train-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#freq-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey){

  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var freq = childSnapshot.val().frequency;

  var trainTimeClean = moment(trainTime, "HH:mm");

  var timeDiff = moment().diff(moment(trainTimeClean), "minutes");

  var timeRemain = timeDiff % freq;

  var minRemain = freq - timeRemain;

  var nextArriv = moment().add(minRemain, "minutes").format("hh:mm a");

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + freq + "</td><td>" + nextArriv + "</td><td>" + minRemain + "</td></tr>");
});