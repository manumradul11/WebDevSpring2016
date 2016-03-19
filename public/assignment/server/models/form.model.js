var mock = require("./form.mock.json");

module.exports = function() {
    var api = {

        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle:findFormByTitle,
        findFormByUserId:findFormByUserId,
        findFieldsByFormId:findFieldsByFormId,
        findFieldByFormId:findFieldByFormId,
        updateField:updateField,
        createField:createField,
        deleteField:deleteField

    };
    return api;

    function createForm (form,userId) {
        var created_form = {
            _id:(new Date).getTime(),
            title: form.title,
            userId:userId,
            fields:[]
        };
        mock.push(created_form);
        return mock;
    }

    function createField (field,formId) {
        formId = parseInt(formId);
        for(var i in mock) {
            if(mock[i].id === formId) {
                var created_field = {
                    _id:(new Date).getTime(),
                    label: field.label,
                    type: field.type,
                    placeholder: field.placeholder
                };
                mock[i].fields.push(created_field);
                return mock[i].fields;
            }
        }
        return null;
    }

    function deleteForm(formId) {
        formId = parseInt(formId);
        for (var i in mock) {
            if (mock[i]._id == formId) {
                mock.splice(i,1);
            }
        }
        return mock;
    }

    function deleteField(formId,fieldId) {
        formId = parseInt(formId);
        fieldId = parseInt(fieldId);
        for(var i in mock) {
            if(mock[i].formId === formId) {
                for(var j in mock[i].fields) {
                    if(mock[i].fields[j]._id === fieldId) {
                        mock[i].fields.splice(j,1)
                    }
                }
                return mock[i].fields;
            }
        }
        return null;
    }

    function updateForm (formId,form) {
        formId = parseInt(formId);
        for(var i in mock) {
            if(mock[i].id === formId) {
                mock[i].title = form.title;
                mock[i].fields = form.fields;
            }
        }
        return mock;
    }

    function updateField (formId,fieldId,field) {
        formId = parseInt(formId);
        fieldId = parseInt(fieldId);
        for(var i in mock) {
            if(mock[i].id === formId) {
                for(var j in mock[i].fields) {
                    if(mock[i].fields[j]._id === fieldId) {
                        mock[i].fields[j]=field;

                    }
                }
                return mock[i].fields;
            }

        }
        return null;
    }

    function findFormById(formId) {
        formId = parseInt(formId);
        for(var i in mock) {
            if(mock[i].id === formId) {
                return mock[i];
            }
        }
        return null;
    }

    function findFormByUserId(userId) {
        userId = parseInt(userId);
        var forms=[];
        for(var i in mock) {
            if(mock[i].userId === userId) {
                forms.push(mock[i]);
            }
        }
        return forms;
    }

    function findFieldsByFormId(formId) {
        formId = parseInt(formId);
        for(var i in mock) {
            if(mock[i].formId === formId) {
                return mock[i].fields;
            }
        }
        return null;
    }

    function findFieldByFormId(formId,fieldId) {
        formId = parseInt(formId);
        fieldId = parseInt(fieldId);
        for(var i in mock) {
            if(mock[i].formId === formId) {
                for(var j in mock[i].fields) {
                    if(mock[i].fields[j]._id === fieldId) {
                        return mock[i].fields[j];
                    }
                }
            }
        }
        return null;
    }

    function findAllForms() {

        return mock;
    }


    function findFormByTitle(title) {
        for(var i in mock) {
            if(mock[i].title === title) {
                return mock[i];
            }
        }
        return null;
    }
};