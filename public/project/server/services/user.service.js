module.exports = function(app,model) {
    app.post("/api/assignment/user", create);
    app.get("/api/assignment/user", getUsers);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user?username=username", getUserByUsername);
    app.get("/api/assignment/user?username=username&password=password", getUserByCredentials);
    app.put("/api/assignment/user/:id", UpdateUserById);
    app.delete("/api/assignment/user/:id", DeleteUserById);

    function getUsers(res) {
        var users = model.findAllUsers();
        res.json(users);
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
        var username = req.params.username;
        var password = req.params.password;
        var credentials={username:username,password:password};
        var user = model.findUserByCredentials(credentials);
        res.json(user);
    }

    function create(req, res) {
        var user = req.body;
        var users = model.createUser(user);
        res.json(users);
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
