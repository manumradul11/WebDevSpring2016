(function() {
    "use strict";

    angular.module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope,$routeParams, FieldService, FormService) {


        var formId;
        $scope.currentField = null;
        $scope.fieldEdit = null;
        $scope.fieldType = null;
        $scope.commitEdit = commitEdit;
        $scope.editField = editField;
        $scope.deleteField = deleteField;
        $scope.addField = addField;
        $scope.repeatField = repeatField;

        if($routeParams.formId) {
            formId = $routeParams.formId;
            $scope.form = FormService.getFormById(formId).title;
        }


        function editField(field){
            $scope.fieldEdit = field;
        }

        function commitEdit(){
            if($scope.fieldEdit.options){
                var opt = $scope.options.split("\n");
                var optionList =[];

                for(var u in opt){
                    var val = opt[u].split(":");
                    optionList.push({"label":val[0],"value":val[1]});
                }
                $scope.fieldEdit.options = optionList;
            }

            FieldService.updateField(formId, $scope.fieldEdit._id, $scope.fieldEdit).then(function(response)
            {
                $scope.fields= response;
            });
            $scope.label = null;
            $scope.placeholder = null;
            $scope.options = null;
        }

        function deleteField(fieldId) {

            FieldService.deleteFieldFromForm(formId, fieldId).then(function(response)
            {
                $scope.fields= response;
            });

        }

        function addField(){
            var field;
            var fieldType = $scope.fieldType;
            switch(fieldType) {
                case "TEXT":
                    field = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field", "options": []};
                    break;
                case "TEXTAREA":
                    field = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field", "options": []};
                    break;
                case "DATE":
                    field = {"_id": null, "label": "New Date Field", "type": "DATE" , "placeholder": null, "options": []};
                    break;
                case "OPTIONS":
                    field = {
                        "_id": null, "label": "New Dropdown", "type": "OPTIONS", "placeholder": null, "options": [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}
                        ]
                    };
                    break;

                case "CHECKBOXES":
                    field = {
                        "_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "placeholder": null, "options": [
                            {"label": "Option A", "value": "OPTION_A"},
                            {"label": "Option B", "value": "OPTION_B"},
                            {"label": "Option C", "value": "OPTION_C"}
                        ]
                    };
                    break;
                case "RADIOS":
                    field = {
                        "_id": null, "label": "New Radio Buttons", "type": "RADIOS", "placeholder": null, "options": [
                            {"label": "Option X", "value": "OPTION_X"},
                            {"label": "Option Y", "value": "OPTION_Y"},
                            {"label": "Option Z", "value": "OPTION_Z"}
                        ]
                    };
                    break;
            }

            FieldService.createFieldForForm(formId, field).then(function(response)
            {
                $scope.fields= response;
            });
        }

        function repeatField(field){

            FieldService.createFieldForForm(formId, field).then(function(response)
            {
                $scope.fields= response;
            });

        }
    }

})();