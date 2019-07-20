forum.controller('userRegisterCtrl', ['$scope', 'userService', '$rootScope', function($scope, userService, $rootScope) {

    $scope.user = {};
    var hulla = new hullabaloo();

    $scope.login = function() {

        userService.loginUser($scope.user)
            .then(function(success) {
                $rootScope.setUser(success.token);
                hulla.send('successfully logined', 'success');

            }, function(failure) {
                hulla.send(failure, 'danger');

            })
    }

    $scope.register = function() {
        userService.addUser($scope.user)
            .then(function(success) {
                if (success=='exists') {
                    hulla.send('email exists', 'info')

                } else {
                    $rootScope.setUser(success);
                    hulla.send('successfully created', 'success');

                }

            }, function(failure) {
                hulla.send(failure, 'danger');
            })
    }
}])