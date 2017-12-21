"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var converstationSchema = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    conversationName: String,
    messages: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }]
});
exports.Conversation = mongoose.model('Conversation', converstationSchema);
