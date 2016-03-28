app.factory("PostService", function ($http, $location, $rootScope) {


    var post = function (newPost, callback) {
        var data = {
            email: $rootScope.user.email,
            data: {
                title: newPost.title,
                desc: newPost.desc,
                offeringType: newPost.offeringType,
                foodType: newPost.foodType,
                date: newPost.date,
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
            callback(res);
        })
    };

    return {
        post: post
    }

});