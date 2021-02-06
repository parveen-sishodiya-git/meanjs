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
    $routeProvider.when("/chat", {
        templateUrl: "assets/views/dynamic/chat.html",
        controller: "chatController"
    });
    $routeProvider.when("/notifications", {
        templateUrl: "assets/views/dynamic/notifications.html",
        controller: "notificationController"
    });


});

app.controller("mapController", function ($scope) {
    let coords = [];
    let rectDrawn = null;
    let marker = null;
    let markerIcon = null;
    let mousedown = false;

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

    mymap.on('mousedown', mouseDownOnMap);
    mymap.on('mousemove', mouseMoveOnMap);
    mymap.on('mouseup', mouseUpOnMap);

    function mouseDownOnMap(down) {
        mousedown = true;
        coords[0] = down.latlng;
        mymap.dragging.disable();
    }

    function mouseMoveOnMap(move) {
        if (mousedown) {
            coords[1] = move.latlng;
            if (rectDrawn != null) {
                mymap.removeLayer(rectDrawn);
                mymap.removeLayer(marker);
            }

            rectDrawn = L.rectangle(coords, {
            }).addTo(mymap);

            markerIcon = L.icon({
                iconUrl:'assets/img/icons/clear.png',
                iconSize:[15,15]
            });

            marker = L.marker(coords[0],{icon:markerIcon}).addTo(mymap).on("click",()=>{
                mymap.removeLayer(rectDrawn);
                mymap.removeLayer(marker);     
            });
        }
    }

    function mouseUpOnMap(up) {
        mousedown = false;
    }

    L.polyline([[68, -42], [48, 26]]).addTo(mymap);
    function onMapClick(e) {
        alert("You clicked the map at " + e.latlng);
    }

})

app.controller("notificationController", function ($scope) {
    $scope.title = "Notification Page";
    $scope.myFunction = () => {
        console.log("my function clicked");
    }
}).directive("formGreen", function () {
    return {
        templateUrl: 'assets/views/static/registration.html'
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

app.controller("chatController", function ($scope) {


    $scope.page = {
        fields: [{
            id: "firstName",
            label: "First Name",
            inputType: "number",
            placeHolder: "Enter your first name"
        }, {
            id: "lastName",
            label: "Last Name",
            inputType: "text",
            placeHolder: "Enter your last name"
        }]
    };


    generatePage = () => {
        console.log("chat i will generate your page");

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
