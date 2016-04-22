'use strict';
var hsTracker = angular.module('hsTracker')
.config(function($routeProvider, $locationProvider){
	$routeProvider.
	when("/", {
		templateUrl : 'views/home.html',
	}).
	when("/stats", {
		templateUrl: "views/stats.html",
		controller: 'statsCtrl'
	}).
	when('/new_game', {
		templateUrl: "views/new_game.html",
		controller: 'gameCtrl'
	}).
	when('/decks', {
		templateUrl: 'views/decks.html',
		controller: 'decksCtrl'
	}).
	when('/signup', {
		templateUrl: 'views/signup.html',
		controller: 'loginCtrl'
	}).
	when('/login', {
		templateUrl: 'views/login.html',
		controller: 'loginCtrl'
	});
	$locationProvider.html5Mode(true);
})
