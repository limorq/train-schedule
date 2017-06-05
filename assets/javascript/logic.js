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

	for (var i=0; i<trains.length; i++) {	
		var table = document.getElementById("trainLine");
		var row = table.insertRow(1);
	    var c1 = row.insertCell(0);
	    var c2 = row.insertCell(1);
	    var c3 = row.insertCell(2);
	    var c4 = row.insertCell(3);
	    var c5 = row.insertCell(4);
	    c1.innerHTML = trains[i].name;
	    c2.innerHTML = trains[i].destination;
	    c3.innerHTML = trains[i].frequency;
	    c4.innerHTML = trains[i].nerowtArrival;
	    c5.innerHTML = trains[i].minToArrival;
	}
}

$("#addTrain").click(function(event) {

	event.preventDefault();

	//retrieve info from form
	train.name = $("#trainName").val().trim();
	train.destination = $("#destin").val().trim();
	train.frequency = $("#freq").val().trim();
	train.nextArrival = $("#trainTime").val().trim();
	trains.push(train);


	//display on viewport
	populateSchedule();
});

$("#removeTrain").click(function(event) {

	event.preventDefault();

	//retrieve train name from form
	var trainToRemove = $("trainName").val().trim();

		//loop thru the trains array to find the item to remove
		var ix = trains.indexOf(trainToRemove);
		if (ix != -1) {
			trains.splice(ix, 1);
			populateSchedule();
		}
});