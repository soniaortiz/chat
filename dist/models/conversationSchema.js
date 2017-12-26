"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var converstationSchema = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    conversationName: { type: String, unique: true },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
});
exports.Conversation = mongoose.model('Conversation', converstationSchema);
//# sourceMappingURL=conversationSchema.js.map