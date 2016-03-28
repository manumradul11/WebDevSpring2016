"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($rootScope,$http, $q) {
        var service = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm:getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        };

        return service;

        function deleteFieldFromForm(formId,fieldId)
        {
            var deferred = $q.defer();
            $http.delete("/api/assignment-3-serverside/form/:"+formId+"/field/:"+fieldId)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createFieldForForm(formId, field) {
            var deferred = $q.defer();
            $http.post("/api/assignment-3-serverside/form/:"+formId+"/field",field)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getFieldsForForm(formId) {
            var deferred = $q.defer();
            $http.get("/api/assignment-3-serverside/form/:"+formId+"/field")
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getFieldForForm(formId, fieldId) {
            var deferred = $q.defer();
            $http.get("/api/assignment-3-serverside/form/:"+formId+"/field/:"+fieldId)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }


        function updateField(formId, fieldId, field) {
            var deferred = $q.defer();
            $http.put("/api/assignment-3-serverside/form/:"+formId+"/field/:"+fieldId,field)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();