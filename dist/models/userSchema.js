"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;
var userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    name: String,
    middleName: String,
    lastName: String,
    password: { type: String },
    birthdate: Date,
    gender: String,
    contacts: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }],
    friendRequests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    avatar: String
});
userSchema.set('toJSON', {
    transform: function (doc, user, options) {
        delete user.password;
        console.log('transform');
        return user;
    }
});
userSchema.pre('save', function (next) {
    var user = this;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            next();
        });
    });
});
exports.UserModel = mongoose.model('User', userSchema);
//# sourceMappingURL=userSchema.js.map