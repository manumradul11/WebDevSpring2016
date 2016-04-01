module.exports = function(app,formModel)
{
    app.post("/api/assignment/user/:userid/form", function(req,res) {
        console.log("in create new form");
        var userid = req.params.userid;
        var newForm = req.body;
        var forms=formModel.createFormForUser(userid,newForm);
        res.json(forms);
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
        var forms=formModel.updateFormByTitle(userid,title,form);
        res.json(forms);
    });

    app.delete("/api/assignment/form/:formId/user/:userId", function(req,res) {
        var delFormId = req.params.formId;
        var userId = req.params.userId;
        formModel.deleteFormById(delFormId,userId);
        res.json("ok");
    });

    app.delete("/api/assignment/form/byTitle/:title/user/:userid", function(req,res) {
        var delFormTitle = req.params.title;
        var userid = req.params.userid;
        var forms=formModel.deleteFormByTitle(delFormTitle,userid);
        res.json(forms);
    });

    //added userId parameter
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
        var forms = formModel.findAllFormsForUser(userId);
        res.json(forms);
    });

    app.get("/api/assignment/form",function(req,res)
    {
        var formId = req.query.formId;
        var form = formModel.findFormById(formId);
        res.json(form);
    });

};