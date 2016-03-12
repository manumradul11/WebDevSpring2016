(function() {
    angular
        .module("FeeFoodApp")
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


        function deleteFormById(userId,formId)
        {
            for (var f in model.forms){
                if (model.forms[f].userId==userId && model.forms[f]._id === formId) {
                    model.forms.splice(f,1);

                }
            }
        }

        function createFormForUser(userId,form,index) {
            var created_form = {
                _id:index,
                title: form.title,
                userId: userId
            };
            model.forms.push(created_form);
        }

        function findAllFormsForUser(userId) {
            var found_forms = [];
            for (var f in model.forms) {
                if (model.forms[f].userId === userId) {
                    found_forms.push(model.forms[f]);
                }

            }
            return found_forms;
        }


        function updateFormById(userId,formId, newForm) {
            for (var f in model.forms) {
                if (model.forms[f].userId==userId && model.forms[f]._id === formId) {
                    model.forms[f].title=newForm.title;
                }
            }
        }
    }
})();