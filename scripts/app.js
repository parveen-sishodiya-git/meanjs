console.log("i will creating your app");
let app = angular.module("app", ["ngRoute"]);

app.config(($routeProvider)=>{
    $routeProvider.when("/",{
        templateUrl:"assets/views/dynamic/home.html"
    });
    $routeProvider.when("/techtrends",{
        templateUrl:"assets/views/dynamic/technologyTrends.html",
        controller:"techTrendController"
    });
    $routeProvider.when("/register",{
        templateUrl:"assets/views/static/registration.html",
        controller:"registrationController"
    });
   
});

app.controller("registrationController",function($scope){

    $scope.registerUser = ()=>{
        let user = {
            first_name:$scope.fname,
            middle_name:$scope.mname,
            last_name:$scope.lname,
            address:$scope.address
        }
        console.log(JSON.stringify(user));
    }

});

app.controller("techTrendController", function($scope){

    $scope.newResponse = [];

    $scope.technologies = [{
        name: "JavaScript",
        likes: 156,
        dislikes: 16
    }, {
        name: "JAVA",
        likes: 210,
        dislikes: 88
    }, {
        name: "ML",
        likes: 160,
        dislikes: 6
    }, {
        name: "C++",
        likes: 66,
        dislikes: 5
    }, {
        name: "Python",
        likes: 169,
        dislikes: 15
    }, {
        name: "AI",
        likes: 68,
        dislikes: 6
    }];


    $scope.technologies.forEach((element, index) => {
        $scope.newResponse[index] = 0;
    });

    $scope.increaseLikes = (index) => {
        if ($scope.newResponse[index] != 1) {
            $scope.technologies[index].likes++;
            if ($scope.newResponse[index] === -1)
                $scope.technologies[index].dislikes--;
            $scope.newResponse[index] = 1;
        }
    }

    $scope.increaseDislikes = (index) => {
        if ($scope.newResponse[index] != -1) {
            $scope.technologies[index].dislikes++;
            if ($scope.newResponse[index] === 1)
                $scope.technologies[index].likes--;
            $scope.newResponse[index] = -1;
        }
    }

});
