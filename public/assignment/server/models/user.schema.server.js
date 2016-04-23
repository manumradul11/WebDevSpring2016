module.exports = function (mongoose) {

    var UserProfileSchema = new mongoose.Schema({
        username:String,
        password:String,
        firstName: String,
        lastName: String,
        email: String,
        phones: [String],
        forms:[],
        roles:[String]
    }, {collection: "user"});

    UserModel = mongoose.model("UserModel", UserProfileSchema);

    return UserModel;
};
