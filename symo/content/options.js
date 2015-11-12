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

	var difficulty = $.cookie('difficulty');


	$('#pwdBtn').click(function() {
		if ($('#pwdBtn').html() === "Change Password") {
			$('#old_pwd').show()
			$('#new_pwd').show()
			$('#nickname').hide()
			$('#difficulty').hide()
			$('#save-btn').hide()
			$('#pwdBtn').html("Save Password");
		} else {
			console.log("lalala");
			$.ajax({
				type: 'POST',
				url: "/user/changePwd",
				data: {
					cookie: $.cookie('token'),
					old_pwd: $('#old_pwdInput').val(),
					new_pwd: $('#new_pwdInput').val()
				},
				success: function(data) {
					var result = jQuery.parseJSON(data);
					if (result.success) {
						alert("Changed Successfully");
						window.location.replace("pre-landing.html");
					} else {
						alert(result.error);
					}
				}
			});
		}
	});

	$('#save-btn').click(function() {
		$.ajax({
			type: 'POST',
			url: "/user/setting",
			data: {
				cookie: $.cookie('token'),
				nickname: $('#nicknameInput').val(),
				difficulty: difficulty
			},
			success: function(data) {
				var result = jQuery.parseJSON(data);
				if (result.success) {
					$.cookie('name', $('#nicknameInput').val());
					$.cookie('difficulty', difficulty);
					alert("Changed Successfully");
					window.location.replace("pre-landing.html");
					// location.reload();
				} else {
					alert(result.error);
				}
			}
		});
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
		$("#0-btn").css({
			"background-color": "CornflowerBlue",
			"color": "white"
		});
		btnId = '#' + difficulty + "-btn";
		$(btnId).css({
			"background-color": "white",
			"color": "black"
		});
		difficulty = 0;
	});

	$("#1-btn").click(function() {
		$("#1-btn").css({
			"background-color": "CornflowerBlue",
			"color": "white"
		});
		btnId = '#' + difficulty + "-btn";
		$(btnId).css({
			"background-color": "white",
			"color": "black"
		});
		difficulty = 1;
	});

	$("#2-btn").click(function() {
		$("#2-btn").css({
			"background-color": "CornflowerBlue",
			"color": "white"
		});
		btnId = '#' + difficulty + "-btn";
		$(btnId).css({
			"background-color": "white",
			"color": "black"
		});
		difficulty = 2;
	});

	$("#3-btn").click(function() {
		$("#3-btn").css({
			"background-color": "CornflowerBlue",
			"color": "white"
		});
		btnId = '#' + difficulty + "-btn";
		$(btnId).css({
			"background-color": "white",
			"color": "black"
		});
		difficulty = 3;
	});

	$("#4-btn").click(function() {
		$("#4-btn").css({
			"background-color": "CornflowerBlue",
			"color": "white"
		});
		btnId = '#' + difficulty + "-btn";
		$(btnId).css({
			"background-color": "white",
			"color": "black"
		});
		difficulty = 4;
	});

	$("#5-btn").click(function() {
		$("#5-btn").css({
			"background-color": "CornflowerBlue",
			"color": "white"
		});
		btnId = '#' + difficulty + "-btn";
		$(btnId).css({
			"background-color": "white",
			"color": "black"
		});
		difficulty = 5;
	});

	$("#6-btn").click(function() {
		$("#6-btn").css({
			"background-color": "CornflowerBlue",
			"color": "white"
		});
		btnId = '#' + difficulty + "-btn";
		$(btnId).css({
			"background-color": "white",
			"color": "black"
		});
		difficulty = 6;
	});

	$("#7-btn").click(function() {
		$("#7-btn").css({
			"background-color": "CornflowerBlue",
			"color": "white"
		});
		btnId = '#' + difficulty + "-btn";
		$(btnId).css({
			"background-color": "white",
			"color": "black"
		});
		difficulty = 7;
	});

	$("#8-btn").click(function() {
		$("#8-btn").css({
			"background-color": "CornflowerBlue",
			"color": "white"
		});
		btnId = '#' + difficulty + "-btn";
		$(btnId).css({
			"background-color": "white",
			"color": "black"
		});
		difficulty = 8;
	});

	$("#9-btn").click(function() {
		$("#9-btn").css({
			"background-color": "CornflowerBlue",
			"color": "white"
		});
		btnId = '#' + difficulty + "-btn";
		$(btnId).css({
			"background-color": "white",
			"color": "black"
		});
		difficulty = 9;
	});

	$("#10-btn").click(function() {
		$("#10-btn").css({
			"background-color": "CornflowerBlue",
			"color": "white"
		});
		btnId = '#' + difficulty + "-btn";
		$(btnId).css({
			"background-color": "white",
			"color": "black"
		});
		difficulty = 10;
	});
});