app.factory("PostService", function ($http, $location, $rootScope) {


    var post = function (newPost, callback) {
        var data = {
            email: $rootScope.user.email,
            data: {
                title: newPost.title,
                desc: newPost.desc,
                offeringType: newPost.offeringType,
                foodType: newPost.foodType,
                date: {
                        month:newPost.date.month,
                        day:newPost.date.day,
                        year:newPost.date.year},
                place_x:newPost.place.geometry.location.lat(),
                place_y:newPost.place.geometry.location.lng(),
                time:
                {   from:{  hr:newPost.time.from.hr,
                            min:newPost.time.from.min,
                            merd:newPost.time.from.merd},
                    till:{  hr:newPost.time.till.hr,
                            min:newPost.time.till.min,
                            merd:newPost.time.till.merd}
                }
            }
        };

        $http.post("/api/user/post/create", data)
        .success(function (res) {
            if (res == 'error') {
                callback("Some Error occured in Server");
            }
            else if (res == 'ok') {
                callback('ok');
            }
        })
        .error(function (err) {
            callback("error");
        })

    };

    var getPosts = function (filter, callback) {
        var data = {
            data: filter
        };

        $http.post("/api/user/post/getPosts", data)
            .success(function (res) {
                callback(res);
            })
            .error(function (err) {
                callback(null);
            })

    };

    return {
        post: post,
        getPosts:getPosts
    }

});