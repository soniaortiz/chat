"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;
exports.userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    name: String,
    middleName: String,
    lastName: String,
    password: { type: String },
    birthdate: Date,
    gender: String,
    contacts: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }],
    //   friends: [{ type: ObjectId, ref: 'User' }]
    friendRequests: [String],
    avatar: String
});
exports.userSchema.set('toJSON', {
    transform: function (doc, user, options) {
        delete user.password;
        delete user._id;
        // console.log('TRANSFORMMM', user);
        return user;
    }
});
exports.userSchema.pre('save', function (next) {
    var user = this;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            next();
        });
    });
});
exports.UserModel = mongoose.model('User', exports.userSchema);
//# sourceMappingURL=userSchema.js.map