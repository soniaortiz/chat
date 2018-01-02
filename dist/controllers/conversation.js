"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var conversationSchema_1 = require("../models/conversationSchema");
var messageSchema_1 = require("../models/messageSchema");
var Conversation = /** @class */ (function (_super) {
    __extends(Conversation, _super);
    function Conversation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = conversationSchema_1.ConversationModel;
        _this.findnull = function (req, res, next) {
            conversationSchema_1.ConversationModel.findOneAndRemove({ conversationName: null })
                .then(function () { return res.sendStatus(200); })
                .catch(function (e) { return res.send(e); });
        };
        _this.getConversation = function (req, res, next) {
            console.log(req.query._id);
            conversationSchema_1.ConversationModel.findOne({ _id: req.query._id })
                .then(function (conversation) {
                console.log(conversation);
                res.send(conversation);
            })
                .catch(function (e) { return res.send(e); });
        };
        _this.sendMessage = function (req, res, next) {
            var conversation_id = req.body.conversation_id;
            new messageSchema_1.MessageModel({ date: new Date(), sender: req.body.sender_id, messageContent: req.body.message_content })
                .save()
                .then(function (message) {
                console.log("The message ", message);
                return conversationSchema_1.ConversationModel.findByIdAndUpdate(conversation_id, { $push: { messages: message._id } }, { new: true }).exec();
            })
                .then(function (conversation) {
                res.send(conversation);
            })
                .catch(function (e) { return res.send(e); });
        };
        return _this;
    }
    return Conversation;
}(base_1.Controller));
exports.Conversation = Conversation;
//# sourceMappingURL=conversation.js.map