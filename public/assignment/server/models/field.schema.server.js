module.exports = function(mongoose,Form) {
    var fieldSchema = mongoose.Schema({
        formId:{type:Schema.Types.ObjectId,ref:'Form'},
        label: String,
        type: String,
        placeholder: String,
        options: []
    }, {collection: 'field'});

    FieldModel = mongoose.model("FieldModel", fieldSchema);

    return FieldModel;
}
