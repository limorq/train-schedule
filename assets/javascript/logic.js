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

//global variables
var curRow = 0;
var database = firebase.database();


//global train object
var train = {
	name: null,
	destination: null,
	frequency: null,
	nextArrival: null,
	minToArrival: null
}

//train array
var trains = [];


function populateSchedule () {

	//retrieve data from firebase
	database.ref().on("value", function(snapshot){

		//update row counter
		curRow++;

		var table = document.getElementById("trainLine");

		//create and insert a row and cells
		var row = table.insertRow(curRow);
	    var c1 = row.insertCell(0);
	    var c2 = row.insertCell(1);
	    var c3 = row.insertCell(2);
	    var c4 = row.insertCell(3);
	    var c5 = row.insertCell(4);
	    c1.innerHTML = snapshot.val().tName;
	    c2.innerHTML = snapshot.val().destin;
	    c3.innerHTML = snapshot.val().freq;
	    c4.innerHTML = snapshot.val().arrival;
	    //c5.innerHTML = train.minToArrival;

	 });  
}

$("#addTrain").click(function(event) {

	event.preventDefault();

	//retrieve info from form
	train.name = $("#trainName").val().trim();
	train.destination = $("#destin").val().trim();
	train.frequency = $("#freq").val().trim();
	train.nextArrival = $("#trainTime").val().trim();

	//set database values
	database.ref().set({
		tName: train.name,
		destin: train.destination,
		freq: train.frequency,
		arrival: train.nextArrival
	});
	
	//display on viewport
	populateSchedule();
});


$("#removeTrain").click(function(event) {

	event.preventDefault();

	//retrieve train name from form
	var trainToRemove = $("#trainName").val().trim();

	//grab all td elements in the schedule table
	var trs = document.querySelectorAll("tr");

		//iterate over each td
		for (var i = 0; i < trs.length; i++) {
		  var text = trs[i].innerText.trim();
		  console.log(trs[i]);
		  console.log(text);
		  console.log(trainToRemove);
		  //check for your target text and delete is a match
		  if (text.toLowerCase() === trainToRemove.toLowerCase()) {
		  	document.getElementById("trainLine").deleteRow(i);
		  	curRow--;
		  }
		}
		
});