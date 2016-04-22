(function() {
    "use strict";

    angular.module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope,$routeParams, FieldService, FormService) {


        var formId;
        $scope.fieldEdit = null;
        $scope.fieldType = null;


        $scope.commitEdit = commitEdit;
        $scope.editField = editField;
        $scope.deleteField = deleteField;
        $scope.addField = addField;
        $scope.repeatField = repeatField;

        if($routeParams.formId) {
            formId = $routeParams.formId;
            $scope.form = FormService.getFormById(formId);
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

            //1
            FieldService.updateField(formId, $scope.fieldEdit._id, $scope.fieldEdit).then(function(response)
            {
                $scope.fields= response;
            });
            $scope.label = null;
            $scope.placeholder = null;
            $scope.options = null;
        }

        function deleteField(fieldId) {
            //2
            FieldService.deleteFieldFromForm(formId, fieldId).then(function(response)
            {
                $scope.fields= response.fields;
            });

        }

        function addField(){
            var field;
            var fieldType = $scope.fieldType;
            switch(fieldType) {
                case "TEXT":
                    field = {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field", "options": []};
                    break;
                case "TEXTAREA":
                    field = {"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field", "options": []};
                    break;
                case "DATE":
                    field = {"label": "New Date Field", "type": "DATE" , "placeholder": null, "options": []};
                    break;
                case "OPTIONS":
                    field = {"label": "New Dropdown", "type": "OPTIONS", "placeholder": null, "options": [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}
                        ]
                    };
                    break;

                case "CHECKBOXES":
                    field = {"label": "New Checkboxes", "type": "CHECKBOXES", "placeholder": null, "options": [
                            {"label": "Option A", "value": "OPTION_A"},
                            {"label": "Option B", "value": "OPTION_B"},
                            {"label": "Option C", "value": "OPTION_C"}
                        ]
                    };
                    break;
                case "RADIOS":
                    field = {"label": "New Radio Buttons", "type": "RADIOS", "placeholder": null, "options": [
                            {"label": "Option X", "value": "OPTION_X"},
                            {"label": "Option Y", "value": "OPTION_Y"},
                            {"label": "Option Z", "value": "OPTION_Z"}
                        ]
                    };
                    break;
            }
            //3
            FieldService.createFieldForForm(formId, field).then(function(response)
            {
                $scope.fields= response.fields;
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