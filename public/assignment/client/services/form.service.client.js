(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService",FormService);


    function FormService($http,$rootScope)
    {

        var api =
        {
            getFormById : getFormById,
            getFormByIndex : getFormByIndex,
            createFormForUser : createFormForUser,          //2
            findAllFormsForUser : findAllFormsForUser,      //1
            deleteFormById : deleteFormById,
            updateFormById : updateFormById,
            deleteFormByTitle:deleteFormByTitle,            //4
            updateFormByTitle:updateFormByTitle             //3

        };

        return api;

        function getFormById(formId)
        {
            return $http.get("/api/assignment/form?formId="+formId);
        }

        function getFormByIndex(index)
        {
            return $http.get("/api/assignment/form/"+index+"/user/"+userid);
        }

        function createFormForUser(form)
        {
            var userid = $rootScope.currentUser._id;

            $http.post("/api/assignment/user/"+userid+"/form", form)
                .success(function (res) {
                    $rootScope.currentUser.forms = res;
                    return "ok";
                })
                .error(function (err) {

                    return "error";
                });
        }

        function findAllFormsForUser()
        {
            var userid = $rootScope.currentUser._id;

            $http.get("/api/assignment/user/"+userid+"/form")
                .success(function (res) {
                    $rootScope.currentUser.forms = res;
                    return "ok";
                })
                .error(function (err) {

                    return "error";
                });
        }

        function deleteFormById(formId)
        {
            return $http.delete("/api/assignment/form/"+formId+"/user/"+userid);
        }

        function deleteFormByTitle(title)
        {
            var userid = $rootScope.currentUser._id;
            $http.delete("/api/assignment/form/byTitle/"+title+"/user/"+userid)
                .success(function (res) {
                    $rootScope.currentUser.forms = res;
                    return "ok";
                })
                .error(function (err) {

                    return "error";
                });

        }

        function updateFormById(formId, newForm)
        {
            return $http.put("/api/assignment/form/"+formId+"/user/"+userid,newForm);
        }

        function updateFormByTitle(title, newForm)
        {
            var userid = $rootScope.currentUser._id;
            $http.put("/api/assignment/form/byTitle/"+title+"/user/"+userid,newForm)
                .success(function (res) {
                    $rootScope.currentUser.forms = res;
                    return "ok";
                })
                .error(function (err) {

                    return "error";
                });
        }
    }
})();