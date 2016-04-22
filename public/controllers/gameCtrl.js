var hsTracker = angular.module('hsTracker')
.controller('gameCtrl', function($scope, $http){
	$scope.formGame = {};
	var messageDiv = document.getElementById("message");

	//get all the heroes
	$http.get('/heroes')
		.success(function(data){
			$scope.heroes = data;
		})
		.error(function(data){
			console.log("Error: " + data);
		});
	//get all the decks
	$http.get('/decks')
		.success(function(data){
			$scope.decks = data;
		})
		.error(function(data){
			console.log('Error: '+ data);
		});

		//get user ID
	$http.get('/session')
		.success(function(data){
			$scope.userSession = data;
		})
		.error(function(data){
			console.log('Error: ' + data);
		});

	//get all the games
	$http.get('/games/' + $scope.userSession)
		.success(function(data){
			$scope.games = data;
		})
		.error(function(data){
			console.log('Error: ' + data);
		});

	//create a game and returns them all
	$scope.createGame = function(){
		$scope.formGame.user_id = $scope.userSession;
		$http.post('/games', $scope.formGame)
			.success(function(data){
				console.log($scope.formGame.user_id);
				$scope.formGame = {};
				$scope.games = data;
				messageDiv.style.visibility = 'visible';
				messageDiv.innerHTML = "Game Saved !";
			})
			.error(function(data){
				messageDiv.style.visibility = 'visible';
				messageDiv.innerHTML = "Sorry, an error occured!";
				console.log('Error: ' + data);
			});
	}
	//delete a game
	$scope.deleteGame = function(id){
		$http.delete('/games/' + id)
			.success(function(data){
				$scope.games = data;
			})
			.error(function(data){
				console.log("Error: " + data);
			});
	};




});
