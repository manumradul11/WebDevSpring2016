var uuid = require('node-uuid');

module.exports = function(mongoose)
{
    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var FormSchema = require("./form.schema.server.js")(mongoose,FieldSchema);

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
        updateFormFieldbyId: updateFormFieldbyId,
        updateFormFields: updateFormFields,
        deleteFormFieldById:deleteFormFieldById,
        createFormField:createFormField
    };

    return api;

    function findAllForms() {
        var deferred = q.defer();

        FormSchema.find({},
            function(err,doc){
                deferred.resolve(doc);
            });

        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();
        FormSchema.find(
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
        FormSchema.find(
            {_id: formId},
            function(err,doc){
                deferred.resolve(doc);
            }
        );

        return deferred.promise;
    }

    //2
    function createFormForUser(userId, form) {
        var new_form = {
            "title": form.title,
            "created": new Date(),
            "updated": new Date(),
            "userId": userId,
            "fields": []
        };

        var deferred = q.defer();

        FormSchema.create(new_form, function (err, doc) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                FormSchema.find(
                    {userId: userId},
                    function(err,doc){
                        deferred.resolve(doc);
                    }
                );
            }
        });

        return deferred.promise;
    }

    //1
    function findAllFormsForUser(userId)
    {   var deferred = q.defer();
        FormSchema.find(
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

        FormSchema.remove(
            {_id : formId},
            function(err,doc){
                deferred.resolve(doc);
            });

        var temp= deferred.promise;

        return findAllFormsForUser(userId);
    }

    //4
    function deleteFormByTitle(title,userId)
    {
        var deferred = q.defer();

        FormSchema.remove(
            {title : title,
            userId : userId},
            function(err,doc){
                if (err) {
                    deferred.reject(err);
                } else {
                    FormSchema.find({userId : userId}, function (err, doc) {
                        console.log(doc);

                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });

        return deferred.promise;
    }

    //3
    function updateFormByTitle(userId,title,form)
    {
        var deferred = q.defer();

        FormSchema.update(
            {title : title, userId : userId},
            {$set : form},
            function(err,stats){
                if (err) {
                    deferred.reject(err);
                } else {
                    FormSchema.find({userId : userId}, function (err, doc) {
                        console.log(doc);

                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });


        return deferred.promise;
    }

    function updateFormById(formId, newForm) {
        var deferred = q.defer();

        FormSchema.update(
            {_id : formId},
            {$set : newForm},
            function(err,stats){
                deferred.resolve(stats);
            });

        var temp= deferred.promise;

        return findAllFormsForUser(userId);
    }


    function findAllFieldsForFormId(formId) {
        var deferred = q.defer();

        FormSchema.find(
            {_id : formId},
            function(err,stats){
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(stats);
                }
            });
        return deferred.promise;
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

    function deleteFormFieldById(formId, field) {
        var deferred = q.defer();

        FormSchema.findByIdAndUpdate(
            formId,
            {$pull: {'fields': {_id: field._id}}},
            {new: true},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }



    function createFormField(formId, field) {
        // Initialize the new field
        var newField = {
            //"_id": uuid.v4(),
            "label": field.label,
            "formId":formId,
            "type": field.type,
            "placeholder": field.placeholder,
            "options": field.options
        }

        var deferred = q.defer();

        FieldSchema.create(newField, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                FormSchema.findById(formId, function (err, currForm) {
                    if (err) {
                        deferred.reject(err);
                    }

                    if (currForm) {
                        currForm.fields.push(doc);
                        currForm.save(function (err, doc) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(doc);
                            }
                        });
                    }
                });
            }
        });

        return deferred.promise;
    }

    function updateFormFieldbyId(formId, fieldId, field) {

        var deferred = q.defer();

        FormSchema.update({'fields._id': fieldId},
            {$set: {
                'fields.$.label': field.label,
                'fields.$.placeholder': field.placeholder,
                'fields.$.options': (field.options? field.options: [])
            }},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    FormSchema.findById(formId, function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });
        return deferred.promise;

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
