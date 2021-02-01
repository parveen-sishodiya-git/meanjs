console.log("i will creating your app");
let app = angular.module("app", ["ngRoute"]);

app.config(($routeProvider) => {
    $routeProvider.when("/", {
        templateUrl: "assets/views/dynamic/home.html"
    });
    $routeProvider.when("/techtrends", {
        templateUrl: "assets/views/dynamic/technologyTrends.html",
        controller: "techTrendController"
    });
    $routeProvider.when("/register", {
        templateUrl: "assets/views/static/registration.html",
        controller: "registrationController"
    });
    $routeProvider.when("/map", {
        templateUrl: "assets/views/dynamic/map.html",
        controller: "mapController"
    });


});

app.controller("mapController", function ($scope) {
    console.log("i will load your map");
    var mymap = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoicGFydmVlbm1hcCIsImEiOiJja2ttc2trdGwzYmNoMm9wYTdsNnZmYTdkIn0.I0PS604HIje1rmMpkHKTiQ'
    }).addTo(mymap);
    mymap.on('click', onMapClick);
    L.rectangle([[3,4],[5,9]]).addTo(mymap);
    function onMapClick(e) {
        alert("You clicked the map at " + e.latlng);
    }
    
})

app.controller("registrationController", function ($scope) {

    $scope.registerUser = () => {
        let user = {
            first_name: $scope.fname,
            middle_name: $scope.mname,
            last_name: $scope.lname,
            address: $scope.address
        }
        console.log(JSON.stringify(user));
    }

});

app.controller("techTrendController", function ($scope) {
    $scope.showFormGreen = false;
    $scope.newResponse = [];

    $scope.registerUser = () => {
        let user = {
            first_name: $scope.fname,
            middle_name: $scope.mname,
            last_name: $scope.lname,
            address: $scope.address
        }
        console.log(JSON.stringify(user));
    }

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

    let formGreen = document.getElementById("formGreen");

    listMypage = (params) => {
        console.log("I will try to route your request");

        formGreen.style.display = "block";


        window.onclick = function (event) {
            if (event.target == formGreen) {
                formGreen.style.display = "none";
            }
        }
        // var span = document.getElementsByClassName("close")[0];

        // When the user clicks the button, open the modal 
        /*span.onclick = function() {
            modal.style.display = "none";
          }*/

    }

    $scope.showOnMap = () => {
        formGreen.style.display = "none";
    }

});
