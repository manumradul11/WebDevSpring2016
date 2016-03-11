(function()
{
    angular
        .module("FeeFoodApp")
        .controller("FormController", FormController);

    function FormController($scope,FormService,UserService)
    {
        var userid = UserService.getCurrentUser();
        $scope.addForm = addForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.updateForm = updateForm;


        function updateForm(form)
        {
            FormService.updateFormById(userid,$scope.selectedFormIndex,form);
            $scope.forms = FormService.findAllFormsForUser(userid);

        }

        function selectForm(index)
        {
            $scope.selectedFormIndex = index;
            $scope.newForm = {
                title: $scope.forms[index].title
            };
            $scope.forms = FormService.findAllFormsForUser(userid);
        }

        function deleteForm(form) {
            var index = $scope.forms.indexOf(form);
            FormService.deleteFormById(userid, index);
            $scope.forms = FormService.findAllFormsForUser(userid);
        }

        function addForm(form)
        {
            $scope.forms.push(form);
            var index = $scope.forms.in;
            FormService.createFormForUser(userid,form,index);
            $scope.forms = FormService.findAllFormsForUser(userid);

        }

        $scope.forms = FormService.findAllFormsForUser(userid);

    }
})();