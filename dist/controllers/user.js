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
var userSchema_1 = require("../models/userSchema");
var conversationSchema_1 = require("../models/conversationSchema");
var messageSchema_1 = require("../models/messageSchema");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = userSchema_1.UserModel;
        _this.login = function (req, res, next) {
            console.log("login");
            var _a = req.body, email = _a.email, password = _a.password;
            console.log(email, password);
            userSchema_1.UserModel.findOne({ email: email, password: password }).then(function (doc) {
                !doc && res.sendStatus(403); //forbidden, user not found
                res.json(doc);
            }).catch(function (e) {
                res.send(e);
            });
        };
        _this.signup = function (req, res, next) {
            // console.log("Register user", req.body);
            var email = req.body.email;
            userSchema_1.UserModel.findOne({ email: email })
                .then(function (doc) {
                if (doc)
                    res.send(409).write('User already created'); //Conflict, user
                new userSchema_1.UserModel(req.body).save()
                    .then(function (newUser) { return res.json(newUser); });
            }).catch(function (e) { return res.send(e); });
        };
        _this.profile = function (req, res, next) {
            // console.log("User profile");
            var email = req.body.email.email;
            console.log(email);
            userSchema_1.UserModel.findOne(email)
                .then(function (user) {
                !user && res.status(404).send("User not found");
                res.json(user); //send the user
            });
        };
        _this.conversations = function (req, res, next) {
            console.log("Conversations");
            var email = req.body.email;
            userSchema_1.UserModel.findOne({ email: email }).populate("conversations")
                .then(function (user) {
                if (user) {
                    console.log(user.email);
                    res.send(user.conversations);
                }
            });
        };
        _this.friendlist = function (req, res, next) {
            var email = req.body.email;
            userSchema_1.UserModel.findOne({ email: email }).populate("contacts")
                .then(function (user) {
                // !user&& res.sendStatus(404);//user not found
                if (user) {
                    res.send(user);
                }
            });
        };
        // friendrequests=(req: express.Request, res: express.Response, next: express.NextFunction)=>{
        // }
        // sendFriendRequest=(req: express.Request, res: express.Response, next: express.NextFunction)=>{//Incomplete
        // }
        _this.aceptFriendRequest = function (req, res, next) {
            var _a = req.body, email = _a.email, email_friend = _a.email_friend; //email is for the user email_friend is of the other user
            new conversationSchema_1.ConversationModel({}).save()
                .then(function (conversation) {
                userSchema_1.UserModel.findOneAndUpdate({ email: email }, { $push: { contacts: email_friend, conversations: conversation._id } })
                    .then(function () {
                    conversationSchema_1.ConversationModel.findById(conversation._id).update({ $push: { participants: [email, email_friend] } }); //adds participants to the conversation
                    userSchema_1.UserModel.findOneAndUpdate({ email_friend: email_friend }, { $push: { contacts: email, conversations: conversation._id } });
                }).catch(function (e) {
                    res.send(e);
                });
            });
        };
        _this.sendMessage = function (req, res, next) {
            new messageSchema_1.MessageModel({
                messageContent: req.body.messageContent,
                sender: req.body.sender
            }).save().then(function (m) {
                conversationSchema_1.ConversationModel.findOneAndUpdate({ _id: req.body.conversation_id }, { $push: { messages: m._id } })
                    .then(function () { return res.send(200); });
            });
        };
        return _this;
    }
    return User;
}(base_1.Controller));
exports.User = User;
//# sourceMappingURL=user.js.map