module.exports = function(app,userModel,formModel)
{
    app.post("/api/assignment-3-serverside/user/:userId/form", function(req,res) {
        console.log("in create new form");
        var userId = req.params.userId;
        var newForm = req.body;
        formModel.createFormForUser(userId,newForm);
        res.json("ok");
    });

    app.put("/api/assignment-3-serverside/form/:formId", function(req,res)
    {
        var formId = req.params.formId;
        var upForm = req.body;
        formModel.updateFormById(formId,upForm);
        res.json("ok");
    });

    //added userId parameter
    app.delete("/api/assignment-3-serverside/form/:formId/user/:userId", function(req,res) {
        var delFormId = req.params.formId;
        var userId = req.params.userId;
        formModel.deleteFormById(delFormId,userId);
        res.json("ok");
    });

    //added userId parameter
    app.get("/api/assignment-3-serverside/form/:formId/user/:userId", function(req,res)
    {
        var formIndex = req.params.formId;
        var userId = req.params.userId;
        var form = formModel.getFormByIndex(formIndex,userId);
        res.json(form);
    });

    app.get("/api/assignment-3-serverside/user/:userId/form", function(req,res)
    {
        var userId = req.params.userId;
        var forms = formModel.findAllFormsForUser(userId);
        res.json(forms);
    });

    app.get("/api/assignment-3-serverside/form",function(req,res)
    {
        var formId = req.query.formId;
        var form = formModel.getFormById(formId);
        res.json(form);
    });

};