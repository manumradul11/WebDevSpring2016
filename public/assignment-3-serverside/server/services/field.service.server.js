module.exports = function(app,model) {
    app.get("/api/assignment-3-serverside/form/:formId/field", getFieldsByFormId);
    app.get("/api/assignment-3-serverside/form/:formId/field/:fieldId", getFieldByFormId);
    app.post("/api/assignment-3-serverside/form/:formId/field", createFieldForForm);
    app.put("/api/assignment-3-serverside/form/:formId/field/:fieldId", UpdateFieldByFormId);
    app.delete("/api/assignment-3-serverside/form/:formId/field/:fieldId", DeleteFieldById);

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

    function createFieldForForm(req,res) {
        var field = req.body;
        var formId=req.params.formId;
        var fields = model.createField(field,formId);
        res.json(fields);
    }

    function UpdateFieldByFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field=req.body;
        var fields = model.updateField(formId,fieldId,field);
        res.json(fields);
    }

    function DeleteFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = model.deleteField(formId,fieldId);
        res.json(fields);
    }
};
