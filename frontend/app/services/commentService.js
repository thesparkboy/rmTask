forum.factory('commentService', ['$http', '$q', function($http, $q) {

    function setHeaders() {
        var headers = { authorization: localStorage.getItem('token') }
        return headers;
    }

    return {

        addComment: function(comment) {

            var promise = $q.defer();

            $http({
                url: `/api/addComment`,
                method: 'post',
                headers: setHeaders(),
                data: {
                    comment: comment
                }
            }).then(function (success) {
                promise.resolve(success.data);

            }, function (failure) {
                promise.reject(failure.data);

            })

            return promise.promise;
        },

        getAllComments: function() {
            var promise = $q.defer();

            $http({
                url: `/api/getAllComment`,
                headers: setHeaders(),
                method: 'GET'
            }).then(function(success) {
                promise.resolve(success.data);

            }, function(failure) {
                console.log(failure.data);
                promise.reject(failure.data);

            })

            return promise.promise;
        },

        upVote: function(id, upvote) {
            var promise = $q.defer();

            $http({
                url: `/api/upvote`,
                method: 'post',
                headers: setHeaders(),
                data: {
                    comment_id: id,
                    upvote:upvote
                }
            }).then(function(success) {
                promise.resolve(success.data);

            }, function(failure) {
                promise.reject(failure.data);

            })

            return promise.promise;
        },

        downVote: function(id, downvote) {
            var promise = $q.defer();

            $http({
                url: `/api/downvote`,
                method: 'post',
                headers: setHeaders(),
                data : {
                    comment_id: id,
                    downvote: downvote
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