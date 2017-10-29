  var config = {
    apiKey: "AIzaSyC_F4mZ-mu9K0i5odcTedCP26IPAT77xGc",
    authDomain: "train-schedule-40838.firebaseapp.com",
    databaseURL: "https://train-schedule-40838.firebaseio.com",
    projectId: "train-schedule-40838",
    storageBucket: "train-schedule-40838.appspot.com",
    messagingSenderId: "557654430431"
};
  firebase.initializeApp(config);
var database = firebase.database();
var intervalId;
var trainToRemove;
var rowKey;
var trainRow = 0;
$("#addTrain").on("click", function(event) {
	event.preventDefault();
	var name = $("#trainName").val().trim();
	var destin = $("#destin").val().trim();
	var freq = $("#freq").val().trim();
	var time = $("#trainTime").val().trim();
	var train = {
		trainName: name,
		desitnation: destin,
		frequency: freq,
		arrivalTime: time
	}
	database.ref().push(train);
	$("#trainName").val("");
	$("#destin").val("");
	$("#trainTime").val("");
	$("#freq").val("");
});
database.ref().on("child_added", function(childSnapshot){
	var name = childSnapshot.val().trainName;
	var destin = childSnapshot.val().desitnation;
	var freq = childSnapshot.val().frequency;
	var time = childSnapshot.val().arrivalTime;
	var diffTime = moment().diff(moment(time), "minutes");
	var remainder = diffTime % freq;
	var minTo = freq - remainder;
	var nextTrain = moment().add(minTo, "minutes");
	var prettyTimeToNext = moment(nextTrain).format("hh:mm a");
	trainRow++;
	$("#trainLine > tbody").append("<tr id = '" + name + "''><td>" + name + "</td><td>" + destin + "</td><td>" + freq + "</td><td>" + prettyTimeToNext + "</td><td>" + minTo + "</td></tr>");
});
$("#removeTrain").click(function(event) {
	event.preventDefault();
	trainToRemove = $("#trainName").val().trim();
	$("#trainName").val("");
	var ix = 1;
	var query = firebase.database().ref().orderByKey();
	query.once("value")
  		.then(function(snapshot) {
    		snapshot.forEach(function(childSnapshot) {
      			rowKey = childSnapshot.key;    			
     		 	var childData = childSnapshot.child("trainName").val();
     		 	if (trainToRemove===childData) {
     		 		database.ref(rowKey).remove();
     		 		document.getElementById("trainLine").deleteRow(ix);
     		 	}
     		 	else {
     		 		ix++;
     		 		console.log(ix);
     		 	}
  });
});
});
