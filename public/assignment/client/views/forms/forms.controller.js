(function()
{
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope,FormService,UserService)
    {
        var userid = UserService.getCurrentUser()._id;
        $scope.addForm = addForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.updateForm = updateForm;


        function updateForm(form)
        {
            //$scope.forms[$scope.selectedFormIndex].title = form.title;

            FormService.updateFormById(UserService.getCurrentUser(),form,
            function()
            {

            })
        }

        function selectForm(index)
        {
            $scope.selectedFormIndex = index;
            $scope.newForm = {
                title: $scope.forms[index].title
            };
        }

        function deleteForm(form)
        {
            var index = $scope.forms.indexOf(form);
            $scope.forms.splice(index, 1);
        }

        function addForm(form)
        {
            FormService.createFormForUser(userid,form,function(created_form)
            {
                $scope.forms.push(created_form);
            });

        }

        FormService.findAllFormsForUser(userid,function(ret_forms)
        {
            $scope.forms= ret_forms;
        })
    }
})();