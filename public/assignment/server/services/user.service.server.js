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
            var user = model.findUserByCredentials(username,password);
            res.json(user);
            return;
        }
        if(username)
        {
            var user = model.findUserByUsername(username);
            res.json(user);
            return;
        }
        else
        {
            var users = model.findAllUsers();
            res.json(users);
            return;
        }

        return null;
    }

    function getUserById(req,res) {
        var id = req.params.id;
        var user = model.findUserById(id);
        res.json(user);
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
        model
            .createUser(user)
            .then(
                function(doc){
                    console.log(doc);
                    res.json(doc);
                },
                function( err ){
                    console.log(err);
                    res.status(400).send(err);

                }
            );
    }

    function create(req, res) {
        var user = req.body;
        var created_user = model.createUser(user);
        res.json(created_user);
    }

    function UpdateUserById(req, res) {
        var id = req.params.id;
        var user=req.body;
        var users = model.updateUser(id,user);
        res.json(users);
    }

    function DeleteUserById(req, res) {
        var id = req.params.id;
        var users = model.deleteUser(id);
        res.json(users);
    }
};
