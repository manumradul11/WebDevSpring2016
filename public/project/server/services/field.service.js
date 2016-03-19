module.exports = function(app,model) {
    app.get("/api/assignment/form/:formId/field", getFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldByFormId);
    app.post("api/assignment/user/:userId/form", createFormForUser);
    app.put("api/assignment/form/:formId", UpdateFormById);
    app.delete("/api/assignment/form/:formId", DeleteFormById);

    function getFieldsByFormId(req,res) {
        var formId = req.params.formId;
        var fields = model.findFieldsByFormId(formId);
        res.json(fields);
    }

    function getFieldByFormId(req,res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = model.findFieldByFormId(formId,fieldId);
        res.json(field);
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
