var hsTracker = angular.module('hsTracker')
.controller('statsCtrl', function($scope, $http){
	$scope.table_deck = false;
	$scope.table_hero = false;

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

		$http.get('/session')
			.success(function(data){
				$scope.userSession = data._id;
			})
			.error(function(data){
				console.log('Error: ' + data);
			});


	$scope.filter = function(){
		var hero = $scope.filtering.hero;
		var deck = $scope.filtering.deck;
		var user_id =  $scope.userSession;
		$scope.filtering = {};
		if(deck == undefined) {
			$scope.table_hero = true;
			$scope.table_deck = false;
		    // No Deck -> returns games with hero filter
			$http.get('/filters/' + hero + '/' + user_id)
				.success(function(data){
					$scope.stats = data;
					console.log(data);
				})
				.error(function(data){
					console.log('Error:' + data);
				});
		} else if(hero == undefined){
			$scope.table_deck = true;
			$scope.table_hero = false;
			//no Hero -> returns games with deck filter
			$http.get('/filters/' + deck + '/' + user_id)
				.success(function(data){
					$scope.stats = data;
				})
				.error(function(data){
					console.log('Error: ' + data);
				});
		}else {
			//hero and deck are defined -> returns games with both filters
		}
		};

});
