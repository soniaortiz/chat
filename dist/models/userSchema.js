"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = new Schema({
    email: { type: String, unique: true },
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
exports.UserModel = mongoose.model('User', userSchema);
