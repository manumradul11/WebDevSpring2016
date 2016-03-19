module.exports = function(app,model) {
    app.get("/api/assignment/form/:formId", getFormById);
    app.get("/api/assignment/user/:userId/form", getFormByUserId);
    app.post("api/assignment/user/:userId/form", createFormForUser);
    app.put("api/assignment/form/:formId", UpdateFormById);
    app.delete("/api/assignment/form/:formId", DeleteFormById);

    function getFormById(req,res) {
        var formId = req.params.formId;
        var form = model.findFormById(formId);
        res.json(form);
    }

    function getFormByUserId(req,res) {
        var userId = req.params.userId;
        var forms = model.findFormByUserId(userId);
        res.json(forms);
    }

    function createFormForUser(req,res) {
        var form = req.body;
        var userId=req.params.userId;
        var forms = model.createForm(form,userId);
        res.json(forms);
    }

    function UpdateFormById(req, res) {
        var formId = req.params.formId;
        var form=req.body;
        var forms = model.updateForm(formId,form);
        res.json(forms);
    }

    function DeleteFormById(req, res) {
        var formId = req.params.formId;
        var forms = model.deleteForm(formId);
        res.json(forms);
    }
};
