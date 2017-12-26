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
                var user = new userSchema_1.UserModel(req.body);
                user.save()
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
            userSchema_1.UserModel.findOne({ email: email })
                .then(function (user) {
                if (user) {
                    console.log(user.email);
                    res.send(user.conversations);
                }
            });
        };
        _this.friendlist = function (req, res, next) {
            var email = req.body.email;
            userSchema_1.UserModel.findOne({ email: email })
                .then(function (user) {
                // !user&& res.sendStatus(404);//user not found
                if (user) {
                    res.send(user.contacts);
                }
            });
        };
        _this.sendFriendRequest = function (req, res, next) {
        };
        _this.aceptFriendRequest = function (req, res, next) {
            var _a = req.body, email = _a.email, email_friend = _a.email_friend; //email is for the user email_friend is of the other user
            var conversation = new conversationSchema_1.Conversation({}).save()
                .then(function (conversation) {
                userSchema_1.UserModel.findOneAndUpdate({ email: email }, { $push: { contacts: email_friend, conversations: conversation._id } })
                    .then(function () {
                    conversationSchema_1.Conversation.findById(conversation._id).update({ $push: { participants: [email, email_friend] } }); //adds participants to the conversation
                    userSchema_1.UserModel.findOneAndUpdate({ email_friend: email_friend }, { $push: { contacts: email, conversations: conversation._id } });
                }).catch(function (e) {
                    res.send(e);
                });
            });
        };
        return _this;
    }
    return User;
}(base_1.Controller));
exports.User = User;
