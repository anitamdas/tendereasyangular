/*
 * Created by nirjh on 9/24/2015.
 */

//Module declaration
// There can be more than one module, here its only one module named tendereasy which is loaded once when the index.html loads up.

var app = angular.module('tendereasy',['ui.router']);

//configuring ui-router to partial view navigation navigation
app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: '../../Views/login.html'
        })

        .state('mapsearch', {
            url: '/mapsearch/',
            templateUrl: '../../Views/mapsearch.html',
            controller : 'MapSearchCTRL',
            params: {user: null}
        })
    ;
    //If we need the url to be '#' excluded then enable
    //$locationProvider.html5Mode({
    //    enabled: true,
    //    requireBase: false
    //});

});

//Controls searching route with pathmanager.js
//Controls plotting route to scribblemaps using scribbleamanager.js


app.controller('MapSearchCTRL', ['$stateParams','$scope','$state', function ($stateParams,$scope,$state) {

    var sm;
    HideResults();
    $scope.userobject = $stateParams.user;
    if ($stateParams.user == null)
    {
        //set default if user object is null for any purposes- just for demo purposes
        var result = $.grep(usersAll, function(e){ return e.email == 'aquaman@atlantis.com'; });
        $scope.userobject = result[0];
    }

    $scope.performSearch = function()
    {
        //Hide the result html div
        HideResults();
        var searchValues = $('#searchForm').serializeArray();
        var stack = new Array();
        AllRoutes = new Array();
        //send source and destination paths to pathmanager
        GetAllPaths(searchValues[0].value,searchValues[1].value,stack);

        //AllRoutes carry all the routes and each route details
        if (AllRoutes.length >0)
        {
            $('#NoResultsFound').hide();
            ShowResults();
            if (sm == null)
            {
                sm = new ScribbleMap(document.getElementById('ScribbleMap'));
            }
            else
            {
                sm.map.wipe();
            }

            HideMapControls(sm);
            LoadMyMap(sm);
            PlotRoutes(AllRoutes[0],sm);
            ScrollToMap();
            $scope.RouteResults = AllRoutes;
        }
        else if (AllRoutes.length ==0)
        {
            $('#NoResultsFound').show();
        }
        console.log(AllRoutes.sort(SortByDistance));
    }

    $scope.plotspecificRoute = function(id)
    {
        if (sm != null)
        {
            console.log(id);
            sm.map.wipe();
            PlotRoutes(AllRoutes[id-1],sm);
            ScrollToMap();
        }
    }


}]);

//Smooth scroll to map div
function ScrollToMap()
{
    $('html, body').animate({
        scrollTop: $("#mapHolder").offset().top
    }, 500);
}

//Login manager- check input url and password to match the mock up data in usermanager.js
app.controller('Login', ['$scope','$state', function ($scope,$state) {

    $scope.loginCheck = function(email, pass)
    {
        var result = $.grep(usersAll, function(e){ return e.email == email; });
        if (result.length > 0 && result[0].pass == pass)
        {
            $state.go('mapsearch',{user: result[0]});
        }
        else
        {
            alert('User not found. Feel free to add yourself at usermanager.js');
        }
    }

}]);

app.controller('tenderCentral', ['$http', '$scope', function ($http, $scope) {


}]);
//validate user input email and password
app.controller('validateCtrl', function($scope) {
    $scope.user = 'Aquaman';
    $scope.email = 'aquaman@atlantis.com';
});

