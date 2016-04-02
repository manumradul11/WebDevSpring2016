var uuid = require('node-uuid');

module.exports = function(mongoose)
{
    var FormModel = require("./form.schema.server.js")(mongoose);
    var FieldModel = require("./field.schema.server.js")(mongoose);
    var q = require("q");

    var api =
    {
        getFormByIndex : getFormByIndex,
        findFormById : findFormById,
        findAllForms: findAllForms,
        findFormByTitle: findFormByTitle,
        createFormForUser : createFormForUser,
        findAllFormsForUser : findAllFormsForUser,
        deleteFormById : deleteFormById,
        updateFormById : updateFormById,
        deleteFormByTitle : deleteFormByTitle,
        updateFormByTitle : updateFormByTitle,
        findAllFieldsForFormId: findAllFieldsForFormId,
        findFormFieldById: findFormFieldById,
        updateFormField: updateFormField,
        updateFormFields: updateFormFields,
        deleteFormFieldById:deleteFormFieldById,
        createFormField:createFormField
    };

    return api;

    function findAllForms() {
        var deferred = q.defer();

        FormModel.find(
            function(err,doc){
                deferred.resolve(doc);
            });

        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();
        FormModel.find(
            {title: title},
            function(err,doc){
                deferred.resolve(doc);
            }
        );

        return deferred.promise;
    }

    function getFormByIndex(index,userId)
    {
        var userForms = [];
        for(var i=0;i<forms.length;i++)
        {
            if(userId == forms[i].userId)
            {
                userForms.push(forms[i]);
            }
        }

        return userForms[index];
    }

    function findFormById(formId) {
        var deferred = q.defer();
        FormModel.find(
            {_id: formId},
            function(err,doc){
                deferred.resolve(doc);
            }
        );

        return deferred.promise;
    }

    function createFormForUser(userId, form)
    {
        var newform =
        {
            "title" : form.title,
            "fields": [],
            "userId" : userId
        };
        var deferred = q.defer();
        FormModel.create(newform,function(err,doc){
            deferred.resolve(doc);
        });
        var temp= deferred.promise;

        return findAllFormsForUser(userId);
    }

    function findAllFormsForUser(userId)
    {   var deferred = q.defer();
        FormModel.find(
            {userId: userId},
            function(err,doc){
                deferred.resolve(doc);
            }
        );

        return deferred.promise;
    }

    function deleteFormById(formId,userId)
    {
        var deferred = q.defer();

        FormModel.remove(
            {_id : formId},
            function(err,doc){
                deferred.resolve(doc);
            });

        var temp= deferred.promise;

        return findAllFormsForUser(userId);
    }

    function deleteFormByTitle(title,userId)
    {
        var deferred = q.defer();

        FormModel.remove(
            {title : title},
            function(err,doc){
                deferred.resolve(doc);
            });

        var temp= deferred.promise;

        return findAllFormsForUser(userId);
    }

    function updateFormByTitle(userId,title,form)
    {
        var deferred = q.defer();

        FormModel.update(
            {title : title},
            {$set : form},
            function(err,stats){
                deferred.resolve(stats);
            });

        var temp= deferred.promise;

        return findAllFormsForUser(userId);
    }

    function updateFormById(formId, newForm) {
        var deferred = q.defer();

        FormModel.update(
            {_id : formId},
            {$set : newForm},
            function(err,stats){
                deferred.resolve(stats);
            });

        var temp= deferred.promise;

        return findAllFormsForUser(userId);
    }


    function findAllFieldsForFormId(formId) {
        var form;
        findFormById(formId).then(
            function(response){
                form = response;
            }
        );

        if (form) {
            return form.fields;
        }

        return [];
    }

    function findFormFieldById(formId, fieldId) {
        var fields = findAllFieldsForFormId(formId);
        if (fields) {
            for (var f in fields) {
                if (fields[f]._id == fieldId) {
                    return fields[f];
                }
            }
        }

        return null;
    }

    function deleteFormFieldById(formId, fieldId) {
        var fields = findAllFieldsForFormId(formId);
        if (fields) {
            for (var f in fields) {
                if (fields[f]._id == fieldId) {
                    fields.splice(f,1);
                }
            }

            var deferred = q.defer();

            FormModel.update(
                {_id : formId},
                {$set : { fields : fields}},
                function(err,stats){
                    deferred.resolve(stats);
                });

            var temp= deferred.promise;

            return findAllFieldsForFormId(formId);
        }

        return null;
    }


    function createFormField(formId, field) {
        var newField = {
            _id: (new Date).getTime().toString(),
            label: field.label,
            type: field.type,
            placeholder: field.placeholder,
            options: field.options
        };

        var fields = findAllFieldsForFormId(formId);
        fields.push(newField);

        var deferred = q.defer();
        FormModel.update(
            {_id : formId},
            {$set : { fields : fields}},
            function(err,stats){
                deferred.resolve(stats);
            });

        var temp= deferred.promise;

        return findAllFieldsForFormId(formId);
    }

    function updateFormField(formId, fieldId, field) {

        var form = findFormById(formId);

        for(var j=0;j<form.fields.length;j++)
        {
            if(fieldId ==forms.fields[j]._id)
            {
                form.fields[j].label = field.label;
                form.fields[j].placeholder = field.placeholder;
                form.fields[j].options = field.options;

                var deferred = q.defer();
                FormModel.update(
                    {_id : formId},
                    {$set : form},
                    function(err,stats){
                        deferred.resolve(stats);
                    });

                var temp= deferred.promise;

                return findAllFieldsForFormId(formId);
            }
        }
        return null;

    }

    function updateFormFields(formId, fields) {
        for(var i=0;i<forms.length;i++)
        {
            if(formId ==forms[i]._id)
            {

                forms[i].fields=fields;
                return forms[i].fields;

            }
        }
        return null;

    }

};
