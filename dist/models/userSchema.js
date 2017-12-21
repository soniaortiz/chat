"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = new Schema({
    email: String,
    name: String,
    middleName: String,
    lastName: String,
    password: String,
    birthdate: Date,
    sex: String,
    contacts: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }],
    avatar: String
});
exports.User = mongoose.model('User', userSchema);
var queryResult = exports.User.findOne({ name: 'sonia' });
console.log(queryResult);
