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
        findFieldByFormId:findFieldByFormId

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

    function deleteForm(formId) {
        formId = parseInt(formId);
        for (var i in mock) {
            if (mock[i]._id == formId) {
                mock.splice(i,1);
            }
        }
        return mock;
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