 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC_F4mZ-mu9K0i5odcTedCP26IPAT77xGc",
    authDomain: "train-schedule-40838.firebaseapp.com",
    databaseURL: "https://train-schedule-40838.firebaseio.com",
    projectId: "train-schedule-40838",
    storageBucket: "train-schedule-40838.appspot.com",
    messagingSenderId: "557654430431"
};
  firebase.initializeApp(config);

//global variables & functions
var database = firebase.database();
var intervalId;

function update(snap) {

}

//click event for add train button
$("#addTrain").on("click", function(event) {

	event.preventDefault();

	//retrieve info from form
	var name = $("#trainName").val().trim();
	var destin = $("#destin").val().trim();
	var freq = $("#freq").val().trim();
	var time = $("#trainTime").val().trim();

	//create local object to hold train info
	var train = {
		trainName: name,
		desitnation: destin,
		frequency: freq,
		arrivalTime: time
	}

	//push train object to firebase
	database.ref().push(train);

	//clear text boxes
	$("#trainName").val("");
	$("#destin").val("");
	$("#trainTime").val("");
	$("#freq").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey){
	
	//store everything into a variable
	var name = childSnapshot.val().trainName;
	var destin = childSnapshot.val().desitnation;
	var freq = childSnapshot.val().frequency;
	var time = childSnapshot.val().arrivalTime;

	//calculate minutes-to & arrival time
	var minTo = moment().diff(moment(time), "minutes");
	//var remainder = diffTime % freq;
	//var minTo = freq - remainder;
	var nextTrain = moment().add(minTo, "minutes");
	var prettyTimeToNext = moment(nextTrain).format("hh:mm a");

	//add data to table
	$("#trainLine > tbody").append("<tr id = '" + prevChildKey + "><td>" + name + "</td><td>" + destin + "</td><td>" + freq + "</td><td>" + prettyTimeToNext + "</td><td>" + minTo + "</td></tr>");

		//set up interval to update schedule every minute
		intervalId = setInterval(function () {			
			update(childSnapshot);			
		}, 6000);
});



$("#removeTrain").click(function(event) {

	event.preventDefault();

	//retrieve train name from form
	var trainToRemove = $("#trainName").val().trim();

	//clear text box
	$("#trainName").val("");

	//remove reference from database
	for (var i=0; i<0; i++) {
		if (trainToRemove === database.ref().child(i).trainName) {
			database.ref().child(trainName).remove();
		}
	}
		
});