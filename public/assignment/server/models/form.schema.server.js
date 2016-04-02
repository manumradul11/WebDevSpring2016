module.exports = function(mongoose) {
    var FormSchema = mongoose.Schema({
        userId: String,
        title: String,
        created: Date,
        updated: Date,
        fields: []
    }, {collection: 'form'});

    FormModel = mongoose.model("FormModel", FormSchema);

    return FormModel;
}