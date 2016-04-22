var hsTracker = angular.module('hsTracker')
.controller('loginCtrl', function($scope, $http){

	var messageDiv = document.getElementById("message");
	var loggedInNav = document.getElementById('logged-in');
	var gameBtn = document.getElementById('gameBtn');
	var logoutBtn = document.getElementById('logoutBtn');
	var loggedOutNav = document.getElementById('logged-out');
	$scope.signupForm = {};
	$scope.loginForm = {};

	if($scope.userSession){
		loggedInNav.style.display = 'block';
		logoutBtn.style.display = 'block';
		gameBtn.style.display = 'block';
		loggedOutNav.style.display = 'none';
	} else {
		loggedOutNav.style.display = 'block';
		loggedInNav.style.display = 'none';
		logoutBtn.style.display = 'none';
		gameBtn.style.display = 'none';
	}

	$http.get('/session')
		.success(function(data){
			$scope.userSession = data;
		})
		.error(function(data){
			console.log('Error: ' + data);
		});

	$scope.signupSubmit = function(){
		console.log($scope.signupForm.email);
		if($scope.signupForm.email == undefined || $scope.signupForm.username == undefined){
			messageDiv.style.visibility = 'visible';
			messageDiv.innerHTML = "Sorry, incomplete form!";
			return;
		}

		$http.post('/signup', $scope.signupForm)
			.success(function(data){
				console.log(data);
				messageDiv.style.visibility = 'visible';
				messageDiv.innerHTML = data;
				location.reload(true);
			})
			.error(function(data){
				messageDiv.style.visibility = 'visible';
				messageDiv.innerHTML = "Sorry, an error occured!";
				console.log('Error: ' + data);
			});
	}

	$scope.verifyLogin = function(){
		if($scope.loginForm.username == undefined || $scope.loginForm.password == undefined){
			messageDiv.style.visibility = 'visible';
			messageDiv.innerHTML = "Sorry, incomplete form!";
			return;
		}

		$http.post('/login', $scope.loginForm)
		.success(function(data){
			console.log(data);
			messageDiv.style.visibility = 'visible';
			messageDiv.innerHTML = data;
			location.reload(true);
		})
		.error(function(data){
			console.log('Error: ' + data);
		})
	}

	$scope.logout = function(){
		$http.get('/logout')
			.success(function(data){
				console.log("Session Dead");
				location.reload(true);
			})
			.error(function(data){
				console.log(data);
			});

	}

});
