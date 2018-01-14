var app = angular.module('AssignmentManagerApp', [
        'ui.router',
        'eventController',
        'eventDetailsController'
    ]);
    
app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/events');
    $stateProvider
        .state('events',{
            url : '/events',
            cale : 'public/index.html',
            controller : 'eventController'
        })
        .state('eventDetails',{
            url : '/events/:descriereEventId',
            cale : 'public/index.html',
            controller : 'eventDetailsController'
        });
})