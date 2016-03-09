(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($rootScope) {
        var model = {
            forms:
                [
                    {"_id": "000", "title": "Contacts", "userId": 123},
                    {"_id": "010", "title": "ToDo",     "userId": 123},
                    {"_id": "020", "title": "CDs",      "userId": 234}
                ]

            ,

            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return model;



        function findFormById(formId) {
            for (var f in model.forms) {
                if (model.forms[f]._id === formId) {
                    return(model.forms[f]);
                }
            }
            return(null);
        }

        function deleteFormById(formId, callback)
        {
            for (var f in model.forms){
                if (model.forms[f]._id === formId) {
                    callback((model.forms.splice(f,1)));
                }
            }
            callback(model.forms);
        }

        function createFormForUser(userId, form, callback) {
            var created_form = {
                _id:(new Date).getTime(),
                title: form.title,
                userId: userId
            };
            model.forms.push(created_form);
            callback(created_form);
        }

        function findAllFormsForUser(userId, callback) {
            var found_forms = [];
            for (var f in model.forms) {
                if (model.forms[f].userId === userId) {
                    found_forms.push(model.forms[f]);
                }
                callback(found_forms);
            }
        }


        function updateFormById(formId, newForm, callback) {
            var ret_form = model.findFormById(formId);
            if (ret_form != null) {
                ret_form.title = newForm.title;
                callback(ret_form);
            } else {
                callback(null);
            }
        }
    }
})();