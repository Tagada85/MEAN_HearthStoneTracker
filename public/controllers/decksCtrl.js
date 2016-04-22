'use strict';

'use strict';
var hsTracker = angular.module('hsTracker')
.controller('decksCtrl', function($scope, $http){
	$scope.deckForm = {};
	var messageDiv = document.getElementById("message");
	//get all heroes when landing on the decks page

	$http.get('/heroes')
		.success(function(data){
			console.log(data);
			$scope.heroes = data;
		})
		.error(function(data){
			console.log('Error: ' + data);
		});
	//get all decks when landing on the decks page
	$http.get('/decks')
		.success(function(data){
			$scope.decks = data;
			console.log(data);
		})
		.error(function(data){
			console.log('Error: ' + data);
		});
	
	$scope.addDeck = function(){
		$http.post('/decks', $scope.deckForm)
			.success(function(data){
				$scope.deckForm = {};
				$scope.decks = data;
				messageDiv.style.visibility = 'visible';
				messageDiv.innerHTML = "Deck Created !";
			})
			.error(function(data){
				messageDiv.style.visibility = 'visible';
				messageDiv.innerHTML = "Sorry, the deck could not be added to the database.";
				console.log('Error: ' + data);
			});
	};
	
})

