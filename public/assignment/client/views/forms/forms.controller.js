(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController(FormService,$scope,$rootScope)
    {
        var selectedTitle=null;

        $scope.$watch(function () {
            return $rootScope.currentUser;
        }, function (response) {
            $scope.user = response;
        }, true);

        $scope.newform =
        {
            title:null
        };

        $scope.addForm = addForm;
        $scope.selectForm = selectForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.init= init();


        function init()
        {
            FormService.findAllFormsForUser();
            $scope.newform.title=null;
        }

        function addForm()
        {
            FormService.createFormForUser($scope.newform);
        }


        function selectForm(index)
        {
            var form = $scope.user.forms[index];
            $scope.newform = {
                title: form.title
            }
            selectedTitle= form.title;
        }


        function updateForm()
        {

            FormService.updateFormByTitle(selectedTitle,$scope.newform);
            selectedTitle=null;
        }


        function deleteForm(index)
        {
            var form = $scope.user.forms[index];
            FormService.deleteFormByTitle(form.title);
        }
    }
})();