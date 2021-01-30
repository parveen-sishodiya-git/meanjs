let app = angular.module("app", []);

app.controller("appController", ($scope) => {

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
