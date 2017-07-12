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
var trainToRemove;
var rowKey;
var trainRow = 0;


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

database.ref().on("child_added", function(childSnapshot){
	
	//store everything into a variable
	var name = childSnapshot.val().trainName;
	var destin = childSnapshot.val().desitnation;
	var freq = childSnapshot.val().frequency;
	var time = childSnapshot.val().arrivalTime;



	//calculate minutes-to & arrival time
	var diffTime = moment().diff(moment(time), "minutes");
	var remainder = diffTime % freq;
	var minTo = freq - remainder;
	var nextTrain = moment().add(minTo, "minutes");
	var prettyTimeToNext = moment(nextTrain).format("hh:mm a");
	trainRow++;

	//add row to table
	$("#trainLine > tbody").append("<tr id = '" + name + "''><td>" + name + "</td><td>" + destin + "</td><td>" + freq + "</td><td>" + prettyTimeToNext + "</td><td>" + minTo + "</td></tr>");

});



$("#removeTrain").click(function(event) {

	event.preventDefault();

	//retrieve train name from form
	trainToRemove = $("#trainName").val().trim();

	//clear text box
	$("#trainName").val("");
	var ix = 1;
	var query = firebase.database().ref().orderByKey();
	query.once("value")
  		.then(function(snapshot) {
    		snapshot.forEach(function(childSnapshot) {

      			//get value of train name from database
      			rowKey = childSnapshot.key;    			
     		 	var childData = childSnapshot.child("trainName").val();
     		 	
console.log(trainToRemove);
console.log(childData);
     		 	if (trainToRemove===childData) {
     		 		//remove child from firebase
     		 		database.ref(rowKey).remove();
     		 		//remove train from schedule

     		 		document.getElementById("trainLine").deleteRow(ix);
     		 	}
     		 	else {
     		 		ix++;
     		 		console.log(ix);
     		 	}
  });
});
});




