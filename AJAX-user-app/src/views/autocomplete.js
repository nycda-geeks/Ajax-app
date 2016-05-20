var time = 0;
var lasttime = 0;


$(document).ready(function() {	
	var cleartime;
$("#autocomplete").on('keyup', function() {
	
		console.log("bloop")
		// time = Date.now()
		// if (time - lasttime > 300 || time === 0) {
		// 	console.log("Updating" + (time-lasttime))
		// 	lasttime = time;

			var postdata = {
				autocomplete: $("#autocomplete").val()
			}
			cleartime = setTimeout(function() {

			$.post("/users/search/", postdata, function(results) {
				console.log(results)
			//$("#choices").html('');
			//$("#choices").text('');
			//$("#choices").val('');
			$("#choices").empty();
			$("#searchResults").html("<ul></ul>");
			for ( var i = 0; i < results.length; i++){
				$("#choices").append("<option>" + results[i] + "</option>");
				console.log('I is ' + i + ' result is ' + results[i])
			}
			for ( var i = 0; i < results.length; i++){
				$("#searchResults ul").append("<li>" + results[i] + "</li>");
				console.log('I is ' + i + ' result is ' + results[i])
			}
			
		})
		// }
}, 300);
});
});
