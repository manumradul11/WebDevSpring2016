module.exports = function(app,model) {
    app.post("/api/assignment-3-serverside/user", create);
    app.get("/api/assignment-3-serverside/user", getUsers);
    app.get("/api/assignment-3-serverside/user/:id", getUserById);
    app.get("/api/assignment-3-serverside/user?username=username", getUsers);
    app.get("/api/assignment-3-serverside/user?username=alice&password=wonderland", getUsers);
    app.put("/api/assignment-3-serverside/user/:id", UpdateUserById);
    app.delete("/api/assignment-3-serverside/user/:id", DeleteUserById);

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

    function create(req, res) {
        var user = req.body;
        var created_users = model.createUser(user);
        res.json(created_users);
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
