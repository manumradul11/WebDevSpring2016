module.exports = function(mongoose) {
    var FieldSchema = mongoose.Schema({
        label: String,
        type: String,
        placeholder: Date,
        options: []
    }, {collection: 'field'});

    FieldModel = mongoose.model("FieldModel", FieldSchema);

    return FieldModel;
}
