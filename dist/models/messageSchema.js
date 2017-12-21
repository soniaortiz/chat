"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var messageSchema = new Schema({
    message: String,
    date: Date,
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: Schema.Types.ObjectId, ref: 'User' },
});
exports.Message = mongoose.model('Message', messageSchema);
