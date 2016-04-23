module.exports = function(app,model,passport, LocalStrategy) {
    app.post("/api/assignment/register", create);
    app.post("/api/assignment/admin/user", createUserByAdmin);
    app.get("/api/assignment/user", getUsers);
    app.get("/api/assignment/admin/user", getUsersByAdmin);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user?username=username", getUsers);
    app.get("/api/assignment/user?username=alice&password=wonderland", getUsers);
    app.put("/api/assignment/user/:id", UpdateUserById);
    app.put("/api/assignment/admin/user/:userId", UpdateUserByIdByAdmin);
    app.delete("/api/assignment/user/:id", DeleteUserById);
    app.delete("/api/assignment/admin/user/:userId", DeleteUserByIdByAdmin);


    passport.use('assignment',new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, function (username, password, done) {
        model.findUserByCredentials(username, password, done);
    }));


    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        model.findUserById(user._id, function (user) {
            done(null, user);
        });
    });

    // Passport authenticated security***************************

    app.post("/api/assignment/login", passport.authenticate('assignment'), function (req, res) {

        var user = req.user;
        delete user.password;
        res.json(user);
    });

    // Logout
    app.post("/api/assignment/logout", function (req, res) {
        model.logout(req.body, req, function (responce) {
            res.send(responce);
        });
    });

    // Check if Logged in
    app.get("/api/assignment/loggedin", function (req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });


    function getUsers(req,res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username)
        {
            model.findUserByUsername(username).then(
                function(response){
                    res.json(response);
                }
            );
            return;
        }
        else
        {
            model.findAllUsers().then(
                function(response){
                    res.json(response);
                }
            );

            return;
        }

        return null;
    }

    function getUserById(req,res) {
        var id = req.params.id;
        model.findUserById(id).then(
            function(response){
                res.json(response);
            }
        );
    }

    function getUsersByAdmin(req,res) {
        var id = req.params.id;
        model.findAllUsers().then(
            function(response){
                var data={"users":response};
                console.log(data.users);
                res.json(data);
            }
        );
    }


    function create(req,res){
        var user = req.body;
        model.createUser(user).then(
                function(response){
                    res.json(response);
                }
            );
    }

    function createUserByAdmin(req,res){
        var user = req.body;
        model.createUser(user).then(
            function(response){
                res.send('ok');
            }
        );
    }

    function UpdateUserById(req, res) {
        var id = req.params.id;
        var user=req.body;
        model.updateUser(id,user).then(
            function(response){
                console.log(response);
                res.json(response);
            }
        );
    }

    function UpdateUserByIdByAdmin(req, res) {
        var id = req.params.userId;
        var user=req.body;
        model.updateUser(id,user).then(
            function(response){
                res.send('ok');
            }
        );
    }

    function DeleteUserById(req, res) {
        var id = req.params.id;
        model.deleteUser(id).then(
            function(response){
                console.log(response);
                res.json(response);
            }
        );
    }

    function DeleteUserByIdByAdmin(req, res) {
        var id = req.params.userId;
        model.deleteUser(id).then(
            function(response){
                console.log(response);
                res.send('ok');
            }
        );
    }
};
