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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var userSchema_1 = require("../models/userSchema");
var conversationSchema_1 = require("../models/conversationSchema");
var messageSchema_1 = require("../models/messageSchema");
var mongoose_1 = require("mongoose");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var app_1 = require("../app");
var moment = require("moment");
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
                        var expirationDate = new Date(moment(moment().add(7, 'days').calendar()).format());
                        if (user) {
                            var id_token = jwt.sign({
                                _id: user._id
                            }, process.env.SECRET_TOKEN);
                            res.cookie('token', id_token, {
                                expires: expirationDate,
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
            // console.log('profile executed', req.user.email);
            var user = req.user;
            !user && res.status(404).send('User not found');
            // nspUser.to(user.email).emit('profile', user);
            user.populate({
                path: 'contacts',
                select: 'name email'
            })
                .execPopulate({ new: true })
                .then(function (u) { res.json(u); });
        };
        _this.conversations = function (req, res, next) {
            var _id = req.user._id;
            // console.log("Conversations request user id:  $$$$", req.user._id); 
            userSchema_1.UserModel.findById(_id)
                .populate({
                path: 'conversations',
                populate: {
                    path: 'participants',
                    select: 'name email -_id'
                }
                // select:  {conversationName: undefined},
            })
                .then(function (user) {
                if (user) {
                    // const conv = _.mapKeys({...user.conversations!}, '_id');
                    var conv = user.conversations.reduce(function (ac, conversation, index) {
                        if (typeof conversation !== 'string') {
                            ac[conversation._id] = conversation;
                        }
                        return ac;
                    }, {});
                    // console.log('user.conversations###', conv);
                    res.send(conv);
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
            // console.log("Sending contact request **", req.body.contactEmail);
            var _a = req.body, userEmail = _a.userEmail, contactEmail = _a.contactEmail;
            userSchema_1.UserModel
                .findOneAndUpdate({ email: contactEmail }, {
                $push: { friendRequests: userEmail }
            }, { new: true }) // websockets
                .then(function (user) {
                if (user) {
                    app_1.nspUser.to(contactEmail).emit('contact request', user.friendRequests);
                    res.sendStatus(200);
                }
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
        _this.acceptFriendRequest = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var contactEmail, email, cntc, conversation, me, contact, x;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contactEmail = req.body.contactEmail;
                        email = req.user.email;
                        return [4 /*yield*/, userSchema_1.UserModel.findOne({ email: contactEmail }).exec()];
                    case 1:
                        cntc = _a.sent();
                        return [4 /*yield*/, new conversationSchema_1.ConversationModel({}).save()];
                    case 2:
                        conversation = _a.sent();
                        return [4 /*yield*/, userSchema_1.UserModel.findOneAndUpdate({ email: email }, {
                                $pull: { friendRequests: contactEmail },
                                $push: { contacts: cntc._id, conversations: conversation._id }
                            }, { new: true }).exec()];
                    case 3:
                        me = _a.sent();
                        return [4 /*yield*/, userSchema_1.UserModel.findOneAndUpdate({ email: contactEmail }, {
                                $push: {
                                    contacts: req.user._id, conversations: conversation._id
                                }
                            }, { new: true })
                                .exec()];
                    case 4:
                        contact = _a.sent();
                        if (!(me && contact)) return [3 /*break*/, 6];
                        // console.log('me: ', me._id, 'contact', contact._id);
                        console.log('the conversation._id ++ ', conversation._id);
                        return [4 /*yield*/, conversationSchema_1.ConversationModel.findOneAndUpdate({ _id: conversation._id }, {
                                $set: {
                                    participants: [me._id, contact._id],
                                    conversationName: undefined
                                }
                            }, { new: true }).exec()];
                    case 5:
                        x = _a.sent();
                        // .then(() => {
                        console.log('conversation ', x);
                        res.send(me);
                        return [3 /*break*/, 7];
                    case 6:
                        next(new mongoose_1.Error('me or contact undefined'));
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        _this.sendMessage = function (req, res, next) {
            // console.log('sender@@@@', req.user);
            new messageSchema_1.MessageModel({
                messageContent: req.body.messageContent,
                sender: req.user._id,
                date: new Date().toString(),
            })
                .save()
                .then(function (message) {
                return message.populate({
                    path: 'sender',
                    select: 'email name'
                }).execPopulate();
            })
                .then(function (m) {
                // console.log('***message***', m);
                // console.log('***conver_id***', req.body.conversation_id);
                conversationSchema_1.ConversationModel
                    .findOneAndUpdate({ _id: req.body.conversation_id }, {
                    $push: { messages: m._id }
                }, { new: true })
                    .then(function (conversation) {
                    // console.log('***conversation: ***', conversation);
                    app_1.nspConversation.to(req.body.conversation_id)
                        .emit('new message', { message: m, conversationId: conversation._id });
                    // console.log('+++++++++', m);
                    res.sendStatus(200);
                });
            })
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
        _this.getMessages = function (req, res, next) {
            var conversationId = req.body.conversationId;
            // console.log('Conversation: ', req.body.conversationId);
            conversationSchema_1.ConversationModel.findById(conversationId)
                .populate({
                path: 'messages',
                populate: {
                    path: 'sender',
                    select: 'email name'
                }
            })
                .populate('participants', 'email')
                .then(function (conversation) {
                // console.log('||||||||||||||||', conversation);
                // const msgs = _.mapKeys([...conversation!.messages], '_id');
                // const conv = _.mapKeys([...user.conversations!], '_id');
                res.send({ msgs: conversation.messages, _id: conversationId });
            })
                .catch(function (e) { return res.send(e); });
        };
        return _this;
    }
    return User;
}(base_1.Controller));
exports.User = User;
//# sourceMappingURL=user.js.map