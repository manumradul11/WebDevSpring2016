module.exports = function (mongoose) {

    var FormSchema = new mongoose.Schema({
        userId:String,
        title:String,
        fields: String,
        lastName: String,
        emails: [String],
        phones: [String],
        forms:[]
    }, {collection: "user"});

    UserProfileModel = mongoose.model("UserProfileModel", UserProfileSchema);

    return UserProfileModel;
};
