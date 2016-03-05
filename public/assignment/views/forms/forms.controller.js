(function()
{
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope)
    {
        $scope.addForm = addForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.updateForm = updateForm;

        function updateForm(form)
        {
            $scope.forms[$scope.selectedFormIndex].title = form.title;

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
            var newForm = {
                title: form.title
            };

            $scope.forms.push(newForm);
        }


        $scope.forms = forms;
    }
})();