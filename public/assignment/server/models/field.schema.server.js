module.exports = function(mongoose,Form) {
    var fieldSchema = mongoose.Schema({
        label: String,
        type: String,
        placeholder: String,
        options: []
    }, {collection: 'field'});

    FieldModel = mongoose.model("FieldModel", fieldSchema);

    return FieldModel;
}
