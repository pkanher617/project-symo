$(document).ready(function() {

	if ($.cookie('token')) {
		$('#nicknameInput').val($.cookie('name'));
		var btnId = '#' + $.cookie('difficulty') + "-btn";
		$(btnId).css("background-color", "CornflowerBlue");
		$(btnId).css("color", "white");
	} else {
		window.location.replace("pre-landing.html");
		alert("User does not have permission to do this");
	}


	$('#pwdBtn').click(function() {
		if ($('#pwdBtn').html() === "Change Password") {
			$('#old_pwd').show()
			$('#new_pwd').show()
			$('#nickname').hide()
			$('#difficulty').hide()
			$('#save-btn').hide()
			$('#pwdBtn').html("Save Password");
		} else {
			$.ajax({
				type: 'POST',
				url: "/user/changePwd",
				data: {

				},
				success: function(data) {

				}
			});
		}
	});

	$('#save-btn').click(function() {
		$.ajax({
			type: 'POST',
			url: "/user/setting",
			data: {

			},
			success: function(data) {

			}
		})
		window.location.replace("pre-landing.html");
	});

	$('#cancel-btn').click(function() {
		if ($('#pwdBtn').html() == "Change Password") {
			window.location.replace("pre-landing.html");
		} else {
			$('#old_pwd').hide()
			$('#new_pwd').hide()
			$('#nickname').show()
			$('#difficulty').show()
			$('#save-btn').show()
			$('#pwdBtn').html("Change Password");
		}

	});

	$("#0-btn").click(function() {
		for (var i = 0; i <= 10; i++) {
			btnId = '#' + i.toString() + "-btn";
			$(btnId).css("background-color", "white");
			$(btnId).css("color", "black");
		}
		$("#0-btn").css("background-color", "CornflowerBlue");
		$("#0-btn").css("color", "white");
		var btnId = ""
	});

	$("#1-btn").click(function() {
		for (var i = 0; i <= 10; i++) {
			btnId = '#' + i.toString() + "-btn";
			$(btnId).css("background-color", "white");
			$(btnId).css("color", "black");
		}
		$("#1-btn").css("background-color", "CornflowerBlue");
		$("#1-btn").css("color", "white");
	});

	$("#2-btn").click(function() {
		for (var i = 0; i <= 10; i++) {
			btnId = '#' + i.toString() + "-btn";
			$(btnId).css("background-color", "white");
			$(btnId).css("color", "black");
		}
		$("#2-btn").css("background-color", "CornflowerBlue");
		$("#2-btn").css("color", "white");
	});

	$("#3-btn").click(function() {
		for (var i = 0; i <= 10; i++) {
			btnId = '#' + i.toString() + "-btn";
			$(btnId).css("background-color", "white");
			$(btnId).css("color", "black");
		}
		$("#3-btn").css("background-color", "CornflowerBlue");
		$("#3-btn").css("color", "white");
	});

	$("#4-btn").click(function() {
		for (var i = 0; i <= 10; i++) {
			btnId = '#' + i.toString() + "-btn";
			$(btnId).css("background-color", "white");
			$(btnId).css("color", "black");
		}
		$("#4-btn").css("background-color", "CornflowerBlue");
		$("#4-btn").css("color", "white");
	});

	$("#5-btn").click(function() {
		for (var i = 0; i <= 10; i++) {
			btnId = '#' + i.toString() + "-btn";
			$(btnId).css("background-color", "white");
			$(btnId).css("color", "black");
		}
		$("#5-btn").css("background-color", "CornflowerBlue");
		$("#5-btn").css("color", "white");
	});

	$("#6-btn").click(function() {
		for (var i = 0; i <= 10; i++) {
			btnId = '#' + i.toString() + "-btn";
			$(btnId).css("background-color", "white");
			$(btnId).css("color", "black");
		}
		$("#6-btn").css("background-color", "CornflowerBlue");
		$("#6-btn").css("color", "white");
	});

	$("#7-btn").click(function() {
		for (var i = 0; i <= 10; i++) {
			btnId = '#' + i.toString() + "-btn";
			$(btnId).css("background-color", "white");
			$(btnId).css("color", "black");
		}
		$("#7-btn").css("background-color", "CornflowerBlue");
		$("#7-btn").css("color", "white");
	});

	$("#8-btn").click(function() {
		for (var i = 0; i <= 10; i++) {
			btnId = '#' + i.toString() + "-btn";
			$(btnId).css("background-color", "white");
			$(btnId).css("color", "black");
		}
		$("#8-btn").css("background-color", "CornflowerBlue");
		$("#8-btn").css("color", "white");
	});

	$("#9-btn").click(function() {
		for (var i = 0; i <= 10; i++) {
			btnId = '#' + i.toString() + "-btn";
			$(btnId).css("background-color", "white");
			$(btnId).css("color", "black");
		}
		$("#9-btn").css("background-color", "CornflowerBlue");
		$("#9-btn").css("color", "white");
	});

	$("#10-btn").click(function() {
		for (var i = 0; i <= 10; i++) {
			btnId = '#' + i.toString() + "-btn";
			$(btnId).css("background-color", "white");
			$(btnId).css("color", "black");
		}
		$("#10-btn").css("background-color", "CornflowerBlue");
		$("#10-btn").css("color", "white");
	});
});