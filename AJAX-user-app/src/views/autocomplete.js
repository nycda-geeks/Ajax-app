var time = 0;
var lasttime = 0;

$(document).ready(function() {
	// $("#autocomplete").on('keyup', function() {
	// 	time = Date.now()
	// 	if (time - lasttime > 300 || time === 0) {
	// 		console.log("Updating" + (time-lasttime))
	// 		lasttime = time;
	// 		$.post(("/users/search/?autocomplete=" + $("#autocomplete").val()), function(results) {
	// 			$("#searchResults").html("<ul>");
	// 			for (result in results) {
	// 				if ($('#autocomplete').val() === "") {} else {
	// 					$("#searchResults").append("<li>" + results[result] + "</li>");
	// 				}
	// 			}
	// 		})
	// 	}
	// });
$("#autocomplete").on('keyup', function() {
	time = Date.now()
	if (time - lasttime > 300 || time === 0) {
		console.log("Updating" + (time-lasttime))
		lasttime = time;
		var postdata = {
			autocomplete: $("#autocomplete").val()
		}
		$.post("/users/search/", postdata, function(results) {
			$("#searchResults").html("<ul>");
			for (result in results) {
				if ($('#autocomplete').val() === "") {} else {
					$("#searchResults").append("<li>" + results[result] + "</li>");
				}
			}
		})
	}
});
$("#lastautocomplete").on('keyup', function() {
	time = Date.now()
	if (time - lasttime > 300 || time === 0) {
		console.log("Updating" + (time-lasttime))
		lasttime = time;
		$.post(("/users/search/?lastautocomplete=" + $("#lastautocomplete").val()), function(results) {
			$("#searchResults").html("");
			for (result in results) {
				if ($('#lastautocomplete').val() === "") {} else {
					$("#searchResults").append("<li>" + results[result] + "</li>");
				}
			}
		})
	}
});
});
