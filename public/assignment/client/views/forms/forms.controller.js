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
            title:null,
            updated:null
        };

        $scope.addForm = addForm;
        $scope.selectForm = selectForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.init= init();


        function init()
        {
            //1
            FormService.findAllFormsForUser();
            $scope.newform.title=null;
        }

        function addForm()
        {
            //2
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
            //3
            $scope.newform.updated= new Date();
            FormService.updateFormByTitle(selectedTitle,$scope.newform);
            selectedTitle=null;
        }


        function deleteForm(index)
        {
            //4
            var form = $scope.user.forms[index];
            FormService.deleteFormByTitle(form.title);
        }
    }
})();