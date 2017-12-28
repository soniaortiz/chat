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
            userSchema_1.UserModel.findOne({ email: email, password: password })
                .then(function (doc) {
                !doc && res.sendStatus(403); //forbidden, user not found
                res.json(doc);
            })
                .catch(function (e) {
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
                return new userSchema_1.UserModel(req.body).save();
            })
                .then(function (newUser) { return res.json(newUser); })
                .catch(function (e) { return res.send(e); });
        };
        _this.profile = function (req, res, next) {
            // console.log("User profile");
            var email = req.query.email.email;
            console.log(email);
            userSchema_1.UserModel.findOne(email)
                .then(function (user) {
                !user && res.status(404).send("User not found");
                res.json(user); //send the user
            });
        };
        _this.conversations = function (req, res, next) {
            console.log("Conversations");
            var user_id = req.body.user_id;
            userSchema_1.UserModel.findById({ _id: user_id })
                .populate("conversations")
                .then(function (user) {
                if (user) {
                    console.log(user.email);
                    res.send(user.conversations);
                }
            });
        };
        _this.friendlist = function (req, res, next) {
            var user_id = req.body.user_id;
            userSchema_1.UserModel.findById({ _id: user_id }).populate("contacts")
                .then(function (user) {
                if (user) {
                    res.send(user.contacts);
                }
            });
        };
        _this.sendFriendRequest = function (req, res, next) {
            //find the friend
            userSchema_1.UserModel.findOneAndUpdate({ _id: req.body.friend_id }, { $push: { friendRequests: req.body.sender_id } }) //
                .then(function (friend) {
                res.send(200);
            });
        };
        _this.friendRequestList = function (req, res, next) {
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
        // acceptFriendRequest=(req: express.Request, res: express.Response, next: express.NextFunction)=>{
        //     let newConversationId: string  = ''
        //     const {email, email_friend, conversation_name} = req.body; //email is for the user email_friend is of the other user
        //     new ConversationModel({conversationName: conversation_name})
        //         .save()
        //         .then((conversation)=> {
        //             newConversationId = conversation._id;
        //             return UserModel.findOneAndUpdate(
        //                 {email},
        //                 {$push: {contacts: email_friend, conversation: newConversationId}},
        //                 {new: true}
        //             ).exec()
        //         })
        //         .then((user)=> {
        //             if(user){
        //                 return UserModel.findOneAndUpdate(
        //                     {email: email_friend},
        //                     {$push: {contacts: email, conversation: newConversationId}},
        //                     {new: true}
        //                 ).exec()    
        //             }
        //             else 
        //                 return null;
        //         })
        //         .then((friend)=>{ 
        //             if(friend){
        //                 ConversationModel
        //                 .findByIdAndUpdate(
        //                     newConversationId,
        //                     {$push: {participants: [email, email_friend]}
        //                 })//adds participants to the conversation
        //                 .exec()    
        //             }
        //         })
        //         .then((conversation) => {
        //             res.status(200).send(conversation)
        //         })
        //         .catch((e:Error)=>res.send(e))
        // }
        _this.sendMessage = function (req, res, next) {
            new messageSchema_1.MessageModel({
                messageContent: req.body.messageContent,
                sender: req.body.sender
            })
                .save()
                .then(function (m) {
                conversationSchema_1.ConversationModel
                    .findOneAndUpdate({
                    _id: req.body.conversation_id
                }, { $push: { messages: m._id }
                });
            })
                .then(function (conversation) { return res.send(conversation); })
                .catch(function (e) { return res.send(e); });
        };
        return _this;
    }
    return User;
}(base_1.Controller));
exports.User = User;
//# sourceMappingURL=user.js.map