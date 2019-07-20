forum.factory('userService', ['$http', '$q', function($http, $q) {

    return {

        addUser: function(user) {
            var promise = $q.defer();

            $http({
                url:`/api/addUser`,
                method:'POST',
                data : {
                    user: user
                }

            }).then(function(success) {
                promise.resolve(success.data);

            }, function(error) {
                promise.reject(error.data);

            })

            return promise.promise;
        },

        loginUser: function(user) {
            var promise = $q.defer();;

            $http({
                url: `/api/loginUser`,
                method: 'POST',
                data: {
                    email: user.email,
                    password: user.password
                }

            }).then(function(success) {
                promise.resolve(success.data);

            }, function(failure) {
                promise.reject(failure.data);

            })

            return promise.promise;
        }
    }
}])