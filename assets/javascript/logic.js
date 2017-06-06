//global variables
var curIx = 0;


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

		//update row counter
		curIx++;

		var table = document.getElementById("trainLine");

		//create and insert a row and cells
		var row = table.insertRow(curIx);
	    var c1 = row.insertCell(0);
	    var c2 = row.insertCell(1);
	    var c3 = row.insertCell(2);
	    var c4 = row.insertCell(3);
	    var c5 = row.insertCell(4);
	    c1.innerHTML = train.name;
	    c2.innerHTML = train.destination;
	    c3.innerHTML = train.frequency;
	    c4.innerHTML = train.nextArrival;
	    c5.innerHTML = train.minToArrival;

	   
}

$("#addTrain").click(function(event) {

	event.preventDefault();

	//retrieve info from form
	train.name = $("#trainName").val().trim();
	train.destination = $("#destin").val().trim();
	train.frequency = $("#freq").val().trim();
	train.nextArrival = $("#trainTime").val().trim();
	
	//display on viewport
	populateSchedule();
});


$("#removeTrain").click(function(event) {

	event.preventDefault();

	//retrieve train name from form
	var trainToRemove = $("#trainName").val().trim();

	//grab all td elements in the schedule table
	var tds = document.querySelectorAll("td");

	//iterate over each td
	for (var i = 0; i < tds.length; i++) {
	  var text = tds[i].innerText;
	  console.log(text);
	  //check for your target text and delete is a match
	  if (text.toLowerCase() === trainToRemove.toLowerCase()) {
	  	document.getElementById("trainLine").deleteRow(curIx);
	  	curIx--;
	  }
	}
		
});