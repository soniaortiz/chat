import { Controller } from './base';
import { UserModel } from '../models/userSchema';
import { ConversationModel } from '../models/conversationSchema';
import { MessageModel } from '../models/messageSchema';
import * as express from 'express';
import { Error } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { Secret } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export class User extends Controller {
    model = UserModel;
    login = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { password, email } = req.body;
        if (!password || !email) { res.sendStatus(403); }
        UserModel.findOne({ email })
            .then((user) => {
                // console.log(password, user&&user.password);
                if (user) {
                    return bcrypt.compare(password, user.password);
                }
                else {
                    res.sendStatus(404);
                }
            })
            .then((flag) => {
                if (flag) // TO CREATE THE TOKEN
                    return UserModel
                        .findOne({ email })
                        .then((user) => {
                            if (user) {
                                const id_token = jwt.sign({
                                    _id: user._id
                                }, process.env.SECRET_TOKEN as Secret);
                                res.cookie('token', id_token, {
                                    expires: new Date(Date.now() + 900000),
                                    httpOnly: true
                                }).send();
                            }
                            else {
                                res.sendStatus(403);
                            }
                        })
                        .catch((e: Error) => res.status(500).json(e))
            })
            .catch((e: Error) => {
                res.status(500).json(e);
            })
    }
    signup = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { email } = req.body;
        console.log(req.body);
        UserModel.findOne({ email: email })
            .then((doc) => {
                console.log(doc);
                if (doc) {
                    const id_token = jwt.sign({
                        email: email
                    }, process.env.SECRET_TOKEN as Secret, { expiresIn: '10d' });
                    console.log(id_token);
                    res.json(id_token);
                }
                return new UserModel(req.body).save();
            })
            .then((newUser) => {
                res.sendStatus(200);
            })
            .catch((e: Error) => res.send(e))
    }
    profile = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log("profile executed", req.user);
        const user = req.user;
        !user && res.status(404).send("User not found");
        res.json(user);// send the user
        // UserModel.findById(_id)
        // .select('-conversations -contacts')

        // .populate({
        //     path: 'conversations',
        //     populate: {
        //         path: 'participants',
        //         select: 'name -_id'
        //     }
        // })
        // .then(
        //     (user)=>{
        //         console.log(user)
        //         !user && res.status(404).send("User not found");
        //         res.json(user);//send the user
        //     })
        // .catch((e: Error)=>res.send(e))
    }
    conversations = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        // console.log("Conversations");
        const { _id } = req.user;
        UserModel.findById({ _id })
            // .populate("conversations")
            .then((user) => {
                if (user) {
                    // console.log(user.email);
                    res.send(user.conversations);
                }
            })
    }
    friendlist = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        // console.log("*** The user id *** ", req.user._id);
        const { _id } = req.user;
        UserModel.findById({ _id })
            .populate("contacts")
            .then((user) => {
                if (user) {
                    res.send(user.contacts);
                }
            });
    }
    sendFriendRequest = (req: express.Request, res: express.Response, next: express.NextFunction) => {// Incomplete
        //find the friend
        UserModel.findOneAndUpdate({ _id: req.body.friend_id },
            { $push: { friendRequests: req.body.sender_id } })//
            .then((friend) => {
                console.log(friend)
                res.send(200);
            }).catch((e: Error) => res.send(e))
    }
    friendRequestList = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        // see friend request list
        UserModel.findById(req.query._id)
            .then((user) => {
                if (user) {
                    // const friendList = user.friendRequests;
                    // friendList.forEach((i)=>{
                    //     console.log(i)
                    // })
                    res.send(user.friendRequests);
                }
            })
            .catch((e: Error) => res.send(e));
    }
    acceptFriendRequest = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { user_id, request_id } = req.body;
        new ConversationModel({})
            .save()
            .then((conversation) => {
                return (UserModel.findByIdAndUpdate(user_id,
                    {
                        $pull: { friendRequests: request_id },
                        $push: { contacts: request_id, conversations: conversation._id }
                    }, { new: true }).exec(), conversation);
            })
            .then((conversation) => {
                console.log("the conversation id: ", conversation._id);
                return (ConversationModel.findByIdAndUpdate(conversation._id,
                    { $set: { participants: [user_id, request_id], conversationName: req.body.conversation_id } }).exec(), conversation)
            })
            .then((conversation) => {
                return UserModel.findByIdAndUpdate(request_id,
                    { $push: { contacts: user_id, conversations: conversation._id } }, { new: true })
                    .exec();
            })
            .then((user) => {
                res.send(user)
            })
            .catch((e) => res.send(e));
    }
    sendMessage = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new MessageModel({
            messageContent: req.body.messageContent,
            sender: req.body.sender
        })
            .save()
            .then(
                (m) => { // after the message is created then the reference is passed to the conversation
                    ConversationModel
                        .findOneAndUpdate({
                            _id: req.body.conversation_id
                        }, {
                                $push: { messages: m._id }
                            });
                }
            )
            .then((conversation) => res.send(conversation))
            .catch((e: Error) => res.send(e));
    }
    logout = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        //close session
        //or close connection
    }
    deleteContact = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { user_id, contact_id } = req.body;
        UserModel.findByIdAndUpdate(user_id, { $pull: { contacts: contact_id } })
            .then(() => {
                return UserModel.findByIdAndUpdate(contact_id, { $pull: { contacts: user_id } }).exec();
            })
            .then((user) => res.json(user))
            .catch((e: Error) => res.send(e));
    }
    findUsers = (req: any, res: express.Response, next: express.NextFunction) => {
        console.log('Execueted  axios ,' req.query.userName);
        UserModel.find({ 'name': {$regex:  req.query.userName, $options: 'i, ^'}})
            .then((users) => {
                console.log(users);
                res.send(users);
            })
            .catch((e) => e);
    }
}
