$(document).ready(function() {

	if ($.cookie('name')) {
		$('#login').html("Log Out");
		$('#register').hide();
		$('#welcome').show();
		$('#welcome').html("Welcome, " + $.cookie('name'));
	}

	$("#login").click(function() {
		if ($('#login').html() === "Log Out") {
			$.ajax({
				type: 'POST',
				url: "/user/logout",
				success: function(data) {
					$.removeCookie('name');
					$.removeCookie('token');
					$('#register').show();
					$('#login').html("Log In");
					$('#welcome').hide();
				},
				error: function(jqXHR, textStatus, errorThrown) {
					alert("Server got errors");
				}
			});
		} else {
			$("#loginform").show();
			$("#loginform").addClass("front");
		}
	});

	$("#register").click(function() {
		$("#registerform").show();
		$("#registerform").addClass("front");
	});

	$('#closereg').click(function() {
		$("#registerform").hide();
		$("#registerform").removeClass("front");
		$('#signup_username').val("");
		$('#signup_nickname').val("");
		$('#signup_password').val("");
		$('#signup_password2').val("");
	});

	$('#closelog').click(function() {
		$("#loginform").hide();
		$("#loginform").removeClass("front");
		$('#login_username').val("");
		$('#login_password').val("");
	});

	$('#register-confirm').click(function() {
		var username = $('#signup_username').val();
		var nickname = $('#signup_nickname').val();
		var password = $('#signup_password').val();
		var password2 = $('#signup_password2').val();

		if (password === password2) {
			$.ajax({
				type: 'POST',
				url: "/user/register",
				data: {
					Username: username,
					Password: password,
					Nickname: nickname
				},
				timeout: 1000,
				datatype: 'json',
				success: function(data) {
					var result = jQuery.parseJSON(data);
					if (result.success) {
						alert("success!");
						$.cookie('name', nickname);
						$.cookie('token', result.cookie);
						$.cookie('difficulty', '0');
						$('#register').hide();
						$('#login').html("Log Out");
						$('#welcome').show();
						$('#welcome').html("Welcome, " + nickname);
					} else {
						alert(result.error);
					}
					$("#registerform").hide();
					$("#registerform").removeClass("front");
					$('#signup_username').val("");
					$('#signup_nickname').val("");
					$('#signup_password').val("");
					$('#signup_password2').val("");
				},
				error: function(jqXHR, textStatus, errorThrown) {
					alert("Server got errors");
				}
			});
		} else {
			alert("The second password is not the same with the first one");
		}
	});

	$('#login-confirm').click(function() {
		var username = $('#login_username').val();
		var password = $('#login_password').val();
		$.ajax({
			type: 'POST',
			url: "/user/login",
			data: {
				Username: username,
				Password: password
			},
			success: function(data) {
				var result = jQuery.parseJSON(data);
				if (result.success) {
					$.cookie('name', result.nickname);
					$.cookie('token', result.cookie);
					$.cookie('difficulty', result.difficulty);
					$('#register').hide();
					$('#login').html("Log Out");
					$('#welcome').show();
					$('#welcome').html("Welcome, " + result.nickname);
				} else {
					alert(result.error);
				}
				$("#loginform").hide();
				$("#loginform").removeClass("front")
				$('#login_username').val("");
				$('#login_password').val("");
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert("Server got errors");
			}
		});
	});

});