var forms = require("./form.mock.json");
var uuid = require('node-uuid');

module.exports = function()
{
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
        return forms;
    }

    function findFormByTitle(title) {
        for (var f in forms) {
            if (forms[f].title == title) {
                return forms[f];
            }
        }

        return null;
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
        for (var f in forms) {
            if (forms[f]._id == formId) {
                return forms[f];
            }
        }

        return null;
    }

    function createFormForUser(userId, form)
    {
        var newform =
        {
            "_id" : uuid.v1(),
            "title" : form.title,
            "fields": [],
            "userId" : userId
        };
        console.log("create form:    formId:"+newform._id);
        forms.push(newform);
        return findAllFormsForUser(userId);
    }

    function findAllFormsForUser(userId)
    {
        var formsForUserId = [];

        for(var i=0;i<forms.length;i++)
        {
            if(forms[i].userId == userId)
            {
                formsForUserId.push(forms[i]);
            }
        }

        return formsForUserId;
    }

    function deleteFormById(formId,userId)
    {
        for(var i=0;i<forms.length;i++)
        {
            if(formId ==forms[i].title)
            {
                forms.splice(i,1);
                return findAllFormsForUser(userId);
            }
        }

        return null;
    }

    function deleteFormByTitle(title,userId)
    {
        for(var i=0;i<forms.length;i++)
        {
            if(userId == forms[i].userId && title==forms[i].title)
            {
                forms.splice(i,1);
                return findAllFormsForUser(userId);
            }
        }

        return null;
    }

    function updateFormByTitle(userId,title,form)
    {
        for(var i=0;i<forms.length;i++)
        {
            if(userId == forms[i].userId && title==forms[i].title)
            {
                forms[i].title = form.title;
                return findAllFormsForUser(userId);
            }
        }

        return null;
    }

    function updateFormById(formId, newForm) {
        for(var i=0;i<forms.length;i++)
        {
            if(formId ==forms[i]._id)
            {

                forms[i].title = newForm.title;
                forms[i].fields = newForm.fields;
                return forms[i];
            }
        }
        return null;
    }


    function findAllFieldsForFormId(formId) {
        var form = findFormById(formId);
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
        for(var i=0;i<forms.length;i++)
        {
            if(formId ==forms[i]._id)
            {

                for(var j=0;j<forms[i].fields.length;j++)
                {
                    if(fieldId ==forms[i].fields[j]._id)
                    {
                        forms[i].fields.splice(j,1);
                        return forms[i].fields;
                    }
                }
            }
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

        var form = findFormById(formId);
        var newForm = {
            _id: form._id,
            title: form.title,
            userId: form.userId,
            fields: fields
        };

        var updatedForm=updateFormById(formId, newForm);
        console.log("here-in createformfield"+ updatedForm)
        return newField;
    }

    function updateFormField(formId, fieldId, field) {

        for(var i=0;i<forms.length;i++)
        {
            if(formId ==forms[i]._id)
            {

                for(var j=0;j<forms[i].fields.length;j++)
                {
                    if(fieldId ==forms[i].fields[j]._id)
                    {
                        forms[i].fields[j].label = field.label;
                        forms[i].fields[j].placeholder = field.placeholder;
                        forms[i].fields[j].options = field.options;
                        return forms[i].fields;
                    }
                }
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
