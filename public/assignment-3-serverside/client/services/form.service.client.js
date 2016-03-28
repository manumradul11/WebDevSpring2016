(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService",FormService);


    function FormService($http)
    {
        var api =
        {
            getFormById : getFormById,
            getFormByIndex : getFormByIndex,
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById
        };

        return api;

        function getFormById(formId)
        {
            return $http.get("/api/assignment-3-serverside/form?formId="+formId);
        }

        //added userId parameter
        function getFormByIndex(index,userId)
        {
            return $http.get("/api/assignment-3-serverside/form/"+index+"/user/"+userId);
        }

        function createFormForUser(userId, form)
        {
            return $http.post("/api/assignment-3-serverside/user/"+userId+"/form",form);
        }

        function findAllFormsForUser(userId)
        {
            return $http.get("/api/assignment-3-serverside/user/"+userId+"/form");
        }

        //added userId parameter
        function deleteFormById(formId,userId)
        {
            return $http.delete("/api/assignment-3-serverside/form/"+formId+"/user/"+userId);
        }

        function updateFormById(formId, newForm)
        {
            return $http.put("/api/assignment-3-serverside/form/"+formId,newForm);
        }
    }
})();