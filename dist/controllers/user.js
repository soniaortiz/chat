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
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var app_1 = require("../app");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = userSchema_1.UserModel;
        _this.login = function (req, res, next) {
            var _a = req.body, password = _a.password, email = _a.email;
            if (!password || !email) {
                res.sendStatus(403);
            }
            userSchema_1.UserModel.findOne({ email: email })
                .then(function (user) {
                // console.log(password, user&&user.password);
                if (user) {
                    return bcrypt.compare(password, user.password);
                }
                res.sendStatus(404);
            })
                .then(function (flag) {
                if (flag) {
                    return userSchema_1.UserModel
                        .findOne({ email: email })
                        .then(function (user) {
                        if (user) {
                            var id_token = jwt.sign({
                                _id: user._id
                            }, process.env.SECRET_TOKEN);
                            res.cookie('token', id_token, {
                                expires: new Date(Date.now() + 900000),
                                httpOnly: true
                            }).send();
                        }
                        res.sendStatus(403);
                    })
                        .catch(function (e) { return res.status(500).json(e); });
                }
            })
                .catch(function (e) {
                res.status(500).json(e);
            });
        };
        _this.signup = function (req, res, next) {
            var email = req.body.email;
            // console.log(req.body);
            userSchema_1.UserModel.findOne({ email: email })
                .then(function (doc) {
                // console.log(doc);
                if (doc) {
                    var id_token = jwt.sign({
                        email: email
                    }, process.env.SECRET_TOKEN, { expiresIn: '10d' });
                    // console.log(id_token);
                    res.json(id_token);
                }
                return new userSchema_1.UserModel(req.body).save();
            })
                .then(function (newUser) {
                res.sendStatus(200);
            })
                .catch(function (e) { return res.send(e); });
        };
        _this.profile = function (req, res, next) {
            // console.log('profile executed', req.user);
            var user = req.user;
            !user && res.status(404).send('User not found');
            res.json(user); // send the user
        };
        _this.conversations = function (req, res, next) {
            // console.log("Conversations");
            var _id = req.user._id;
            userSchema_1.UserModel.findById({ _id: _id })
                .then(function (user) {
                if (user) {
                    // console.log(user.email);
                    res.send(user.conversations);
                }
            });
        };
        _this.friendlist = function (req, res, next) {
            var _id = req.user._id;
            userSchema_1.UserModel.findById({ _id: _id })
                .populate('contacts')
                .then(function (user) {
                if (user) {
                    res.send(user.contacts);
                }
            });
        };
        _this.sendFriendRequest = function (req, res, next) {
            console.log('Sending contact request **');
            // console.log("Sending contact request **", req.body.emailContact);
            var _a = req.body, userEmail = _a.userEmail, contactEmail = _a.contactEmail;
            userSchema_1.UserModel
                .findOneAndUpdate({ email: contactEmail }, { $push: { friendRequests: userEmail }
            }, { new: true }) // websockets
                .then(function (user) {
                // io.in(user.id).emmit('send request', { hello: 'world' });
                app_1.io.emit('send request', { hello: 'world' });
                res.sendStatus(200);
            })
                .catch(function (e) { return res.send(e); });
        };
        _this.friendRequestList = function (req, res, next) {
            // see friend request list
            userSchema_1.UserModel.findById(req.query._id)
                .then(function (user) {
                if (user) {
                    // const friendList = user.friendRequests;
                    // friendList.forEach((i)=>{
                    //     console.log(i)
                    // })
                    res.send(user.friendRequests);
                }
            })
                .catch(function (e) { return res.send(e); });
        };
        _this.acceptFriendRequest = function (req, res, next) {
            // console.log('*******************************************************************************  ');
            var contactEmail = req.body.contactEmail;
            var email = req.user.email;
            // console.log("emailContact", contactEmail);
            // console.log("email", email);
            new conversationSchema_1.ConversationModel({})
                .save()
                .then(function (conversation) {
                return (userSchema_1.UserModel.findOneAndUpdate({ email: email }, {
                    $pull: { friendRequests: contactEmail },
                    $push: { contacts: contactEmail, conversations: conversation._id }
                }, { new: true }).exec(),
                    conversation);
            })
                .then(function (conversation) {
                // console.log('the conversation id: ', conversation._id);
                return (conversationSchema_1.ConversationModel.findOneAndUpdate(conversation._id, {
                    $set: {
                        participants: [email, contactEmail],
                        conversationName: req.body.conversation_id
                    }
                }).exec(),
                    conversation);
            })
                .then(function (conversation) {
                return userSchema_1.UserModel.findOneAndUpdate(email, { $push: { contacts: email, conversations: conversation._id } }, { new: true })
                    .exec();
            })
                .then(function (user) {
                res.send(user);
            })
                .catch(function (e) { return res.send(e); });
        };
        _this.sendMessage = function (req, res, next) {
            new messageSchema_1.MessageModel({
                messageContent: req.body.messageContent,
                sender: req.body.sender
            })
                .save()
                .then(function (m) {
                conversationSchema_1.ConversationModel
                    .findOneAndUpdate({ _id: req.body.conversation_id }, {
                    $push: { messages: m._id }
                });
            })
                .then(function (conversation) { return res.send(conversation); })
                .catch(function (e) { return res.send(e); });
        };
        _this.logout = function (req, res, next) {
            // console.log('Loging out');
            res.clearCookie('token', { httpOnly: true }); // Deletes the cookie it sets the expiration date to an old one
            req.logOut(); // erases the logged user from the requests
            // console.log(req.user);
            res.sendStatus(200);
        };
        _this.deleteContact = function (req, res, next) {
            var _a = req.body, user_id = _a.user_id, contact_id = _a.contact_id;
            userSchema_1.UserModel.findByIdAndUpdate(user_id, { $pull: { contacts: contact_id } })
                .then(function () {
                return userSchema_1.UserModel.findByIdAndUpdate(contact_id, { $pull: { contacts: user_id } }).exec();
            })
                .then(function (user) { return res.json(user); })
                .catch(function (e) { return res.send(e); });
        };
        _this.findUsers = function (req, res, next) {
            // console.log('Execueted  axios ,', req.query.userName);
            // const query = UserModel.find();
            userSchema_1.UserModel.find({
                $or: [{ name: { $regex: req.query.userName, $options: 'gim' } },
                    { email: { $regex: req.query.userName, $options: 'gim' } }]
            }, '-id -contacts -conversations -birthdate')
                .then(function (users) {
                // console.log(users);
                res.send(users);
            })
                .catch(function (e) { return e; });
        };
        _this.rejectContactRequest = function (req, res, next) {
            // console.log('Rejecting contact*********************************');
            var email = req.user.email;
            var contactEmail = req.body.contactEmail;
            // console.log('useremail', email);
            // console.log(contactEmail);
            userSchema_1.UserModel
                .findOneAndUpdate({ email: email }, {
                $pull: {
                    friendRequests: contactEmail
                }
            }, { new: true })
                .then(function (user) {
                // console.log('***user***: ', user);
                res.send(user);
            })
                .catch(function (e) {
                // console.log(e);
                res.send(e);
            });
        };
        return _this;
    }
    return User;
}(base_1.Controller));
exports.User = User;
//# sourceMappingURL=user.js.map