module.exports = function(app,model) {
    app.post("/api/assignment/user", create);
    app.get("/api/assignment/user", getUsers);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user?username=username", getUsers);
    app.get("/api/assignment/user?username=alice&password=wonderland", getUsers);
    app.put("/api/assignment/user/:id", UpdateUserById);
    app.delete("/api/assignment/user/:id", DeleteUserById);

    function getUsers(req,res) {
        var username = req.query.username;
        var password = req.query.password;
        if(password)
        {
            model.findUserByCredentials(username,password).then(
                function(response){
                    console.log(response);
                    res.json(response);
                }
            );
            return;
        }
        if(username)
        {
            model.findUserByUsername(username).then(
                function(response){
                    console.log(response);
                    res.json(response);
                }
            );
            return;
        }
        else
        {
            model.findAllUsers().then(
                function(response){
                    console.log(response);
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
                console.log(response);
                res.json(response);
            }
        );
    }

    function getUserByUsername(req,res) {
        var username = req.params.username;
        var user = model.findUserByUsername(username);
        res.json(user);
    }

    function getUserByCredentials(req,res) {
        var username = req.query.username;
        var password = req.query.password;
        var user = model.findUserByCredentials(username,password);
        if (user) {
            res.json(user);
            return;
        }
        res.send(null);
    }

    function create(req,res){
        var user = req.body;
        model.createUser(user).then(
                function(response){
                    console.log(response);
                    res.json(response);
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

    function DeleteUserById(req, res) {
        var id = req.params.id;
        model.deleteUser(id).then(
            function(response){
                console.log(response);
                res.json(response);
            }
        );
    }
};
