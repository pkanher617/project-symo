$(document).ready(function() {


	if ($.cookie('token')) {
		console.log($.cookie());
		$('#login').hide();
		$('#register').hide();
		$('#welcome').show();
		$('#welcome').html("Welcome, " + Cookies.get('name'));
	}
	// if (Cookies.get('name')){
	// 	console.log($.cookie());
	// }

	// console.log(Cookies.get());

	$("#login").click(function() {
		$("#loginform").show();
		$("#loginform").addClass("front");
		$('#login').disabled = true;
		$('#register').disabled = true;
	});

	$("#register").click(function() {
		$("#registerform").show();
		$("#registerform").addClass("front");
		$('#login').disabled = true;
		$('#register').disabled = true;
	});

	$('#closereg').click(function() {
		$("#registerform").hide();
		$("#registerform").removeClass("front");
	});

	$('#closelog').click(function() {
		$("#loginform").hide();
		$("#loginform").removeClass("front");
	});

	$('#register-confirm').click(function() {
		var username = $('#signup_username').val();
		var nickname = $('#signup_nickname').val();
		var password = $('#signup_password').val();
		var password2 = $('#signup_password2').val();

		if (password === password2) {
			var data = {
				Username: username,
				Password: password,
				Nickname: nickname
			};
			$.ajax({
				type: 'POST',
				url: "/user/register",
				data: JSON.stringfy(data),
				success: function(data) {
					if (data !== "ok") {
						alert(data);
					} else {
						console.log('success');
						alert('success!');
						$('#login').addClass('hidden');
						$('#register').addClass('hidden');
						$('#welcome').removeClass('hidden');
						$('#welcome').html("Welcome, " + username);
					}
				},
				error: function(xhr, status, error) {
					alert("Register failed");
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
				if (data !== 'ok') {
					console.log(data);
					alert(data);
				} else {
					console.log('success');
					alert('success!');
					$('#login').addClass('hidden');
					$('#register').addClass('hidden');
					$('#welcome').removeClass('hidden');
					$('#welcome').html("Welcome, " + username);
				}
			},
			error: function(xhr, status, error) {
				alert(error);
			}
		});
	});

});