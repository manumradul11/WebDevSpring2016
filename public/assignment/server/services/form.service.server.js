module.exports = function(app,formModel)
{
    app.post("/api/assignment/user/:userid/form", function(req,res) {
        console.log("in create new form");
        var userid = req.params.userid;
        var newForm = req.body;

        formModel.createFormForUser(userid,newForm).then(
            function(response){
                console.log(response);
                res.json(response);
            }
        );
    });

    app.put("/api/assignment/form/:formId", function(req,res)
    {
        var formId = req.params.formId;
        var upForm = req.body;

        formModel.updateFormById(formId,upForm);
        res.json("ok");
    });

    app.put("/api/assignment/form/byTitle/:title/user/:userid", function(req,res)
    {
        var title = req.params.title;
        var userid= req.params.userid;
        var form = req.body;
        formModel.updateFormByTitle(userid,title,form).then(
            function(response){
                console.log(response);
                res.json(response);
            }
        );
    });

    app.delete("/api/assignment/form/:formId/user/:userId", function(req,res) {
        var delFormId = req.params.formId;
        var userId = req.params.userId;
        formModel.deleteFormById(delFormId,userId).then(
            function(response){
                console.log(response);
                res.json(response);
            }
        );
    });

    app.delete("/api/assignment/form/byTitle/:title/user/:userid", function(req,res) {
        var delFormTitle = req.params.title;
        var userid = req.params.userid;
        formModel.deleteFormByTitle(delFormTitle,userid).then(
            function(response){
                console.log(response);
                res.json(response);
            }
        );
    });

    app.get("/api/assignment/form/:formId/user/:userId", function(req,res)
    {
        var formIndex = req.params.formId;
        var userId = req.params.userId;
        var form = formModel.getFormByIndex(formIndex,userId);
        res.json(form);
    });

    app.get("/api/assignment/user/:userid/form", function(req,res)
    {
        var userId = req.params.userid;
        formModel.findAllFormsForUser(userId).then(
            function(response){
                console.log(response);
                res.json(response);
            }
        );
    });

    app.get("/api/assignment/form",function(req,res)
    {
        var formId = req.query.formId;
        formModel.findFormById(formId).then(
            function(response){
                console.log(response);
                res.json(response);
            }
        );
    });

};