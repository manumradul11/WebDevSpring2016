module.exports = function (app, formModel) {
    app.get("/api/assignment/form/:formId/fields", findAllFieldsForFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldIdAndFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFormFieldById);
    app.post("/api/assignment/form/:formId/field", createFormField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFormField);
    app.put("/api/assignment/form/:formId/fields", updateFormFields);


    function findAllFieldsForFormId(req, res) {
        var formId = req.params.formId;
        var fields = formModel.findAllFieldsForFormId(formId);
        res.json(fields);
    }

    function findFieldByFieldIdAndFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = formModel.findFieldByFieldIdAndFormId(formId, fieldId);
        res.json(field);
    }

    function deleteFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = formModel.deleteFormFieldById(formId, fieldId);
        res.json(fields);
    }

    function createFormField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        var newField = formModel.createFormField(formId, field);
        var result= formModel.findAllFieldsForFormId(formId);
        console.log("here in field server service"+result);
        res.json(result);
    }

    function updateFormField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        var fields = formModel.updateFormField(formId, fieldId, field);
        res.json(fields);
    }

    function updateFormFields(req, res) {
        var formId = req.params.formId;
        var fields = req.body;
        var fields = formModel.updateFormFields(formId, fields);
        res.json(fields);
    }

};