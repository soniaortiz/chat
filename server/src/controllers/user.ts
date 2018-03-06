import { Controller } from './base';
import { UserModel } from '../models/userSchema';
import { ConversationModel } from '../models/conversationSchema';
import { MessageModel } from '../models/messageSchema';
import * as express from 'express';
import { Error } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { Secret } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { io, nspUser, nspConversation } from '../app';
import * as moment from 'moment';

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
                res.sendStatus(404);
            })
            .then((flag) => {
                if (flag) { // TO CREATE THE TOKEN
                    return UserModel
                        .findOne({ email })
                        .then((user) => {
                            const expirationDate = new Date(moment(moment().add(7, 'days').calendar()).format());
                            if (user) {
                                const id_token = jwt.sign(
                                    {
                                        _id: user._id
                                    },
                                    process.env.SECRET_TOKEN as Secret);
                                res.cookie('token', id_token, {
                                    expires: expirationDate,
                                    httpOnly: true
                                }).send();
                            }
                            res.sendStatus(403);
                        })
                        .catch((e: Error) => res.status(500).json(e));
                }
            })
            .catch((e: Error) => {
                res.status(500).json(e);
            });
    }
    signup = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { email } = req.body;
        // console.log(req.body);
        UserModel.findOne({ email: email })
            .then((doc) => {
                // console.log(doc);
                if (doc) {
                    const id_token = jwt.sign(
                        {
                            email: email
                        },
                        process.env.SECRET_TOKEN as Secret, { expiresIn: '10d' });
                    // console.log(id_token);
                    res.json(id_token);
                }
                return new UserModel(req.body).save();
            })
            .then((newUser) => {
                res.sendStatus(200);
            })
            .catch((e: Error) => res.send(e));
    }
    profile = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        // console.log('profile executed', req.user.email);
        const user = req.user;
        !user && res.status(404).send('User not found');
        // nspUser.to(user.email).emit('profile', user);
        res.json(user);
    }
    conversations = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { _id } = req.user;
        console.log("Conversations request user id:  $$$$", req.user._id);

        UserModel.findById(_id)
            .populate(
                {
                    path: 'conversations',
                    populate: {
                        path: 'participants',
                        select: 'name email -_id'
                    }
                    // select:  {conversationName: undefined},
                })
            .then((user) => {
                if (user) {
                    console.log('user.email###', user);
                    res.send(user.conversations);
                }
            });
    }
    friendlist = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { _id } = req.user;
        UserModel.findById({ _id })
            .populate('contacts')
            .then((user) => {
                if (user) {
                    res.send(user.contacts);
                }
            });
    }
    sendFriendRequest = (req: express.Request, res: express.Response, next: express.NextFunction) => {// Incomplete
        // console.log('Sending contact request **');
        // console.log("Sending contact request **", req.body.emailContact);
        const { userEmail, contactEmail } = req.body;
        UserModel
            .findOneAndUpdate(
                { email: contactEmail },
                {
                    $push:
                        { friendRequests: userEmail }
                },
                { new: true }) // websockets
            .then((user) => {
                // io.in(user.id).emmit('send request', { hello: 'world' });
                // io.emit('send request', { hello: 'world' });
                // console.log('---------', user);
                if (user) {
                    nspUser.to(contactEmail).emit('contact request', user.friendRequests);
                    res.sendStatus(200);
                }

            })
            .catch((e) => res.send(e));
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
    acceptFriendRequest = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        // console.log('*******************************************************************************  ');
        const { contactEmail } = req.body;
        const email = req.user.email;
        console.log("emailContact", contactEmail);
        console.log("email", email);
        const conversation = await new ConversationModel({}).save();
        const me = await UserModel.findOneAndUpdate(
            { email },
            {
                $pull: { friendRequests: contactEmail },
                $push: { contacts: contactEmail, conversations: conversation._id }
            },
            { new: true }).exec();

        const contact = await UserModel.findOneAndUpdate(
            { email: contactEmail },
            {
                $push: {
                    contacts: email, conversations: conversation._id
                }
            },
            { new: true })
            .exec();

        if (me && contact) {
            console.log('me: ', me._id, 'contact', contact._id);
            await ConversationModel.findOneAndUpdate(
                conversation._id,
                {
                    $set: {
                        participants: [me._id, contact._id],
                        conversationName: undefined
                    }
                }).exec();
            res.send(me);
        } else {
            next(new Error('me or contact undefined'));
        }

        // new ConversationModel({})
        //     .save()
        //     .then((conversation) => {
        //         return (UserModel.findOneAndUpdate(
        //             { email },
        //             {
        //                 $pull: { friendRequests: contactEmail },
        //                 $push: { contacts: contactEmail, conversations: conversation._id }
        //             },
        //             { new: true }).exec(),
        //             conversation);
        //     })
        //     .then((conversation) => {
        //         // console.log('the conversation id: ', conversation._id);
        //         return (ConversationModel.findOneAndUpdate(
        //             conversation._id,
        //             {
        //                 $set: {
        //                     participants: [email, contactEmail],
        //                     conversationName: undefined
        //                 }
        //             }).exec(),
        //             conversation);
        //     })
        //     .then((conversation) => {
        //         return UserModel.findOneAndUpdate(
        //             contactEmail,
        //             {
        //                 $push: {
        //                     contacts: email, conversations: conversation._id
        //                 }
        //             },
        //             { new: true })
        //             .exec();
        //     })
        //     .then((user) => {
        //         res.send(user);
        //     })
        //     .catch((e) => res.send(e));
    }
    sendMessage = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        // console.log('sender@@@@', req.user);
        new MessageModel({
            messageContent: req.body.messageContent,
            sender: req.user._id,
            date: new Date().toString(),
        })
            .save()
            .then((message) => {
                return message.populate('sender');
            })
            .then(
                (m) => { // after the message is created then the reference is passed to the conversation
                    // console.log('***message***', m);
                    // console.log('***conver_id***', req.body.conversation_id);
                    ConversationModel
                        .findOneAndUpdate(
                            { _id: req.body.conversation_id },
                            {
                                $push: { messages: m._id }
                            },
                            { new: true }
                        )
                        .then((conversation) => {
                            // console.log('***conversation: ***', conversation);
                            nspConversation.to(req.body.conversation_id)
                                .emit('new message', { message: m, conversationId: conversation!._id });
                            res.sendStatus(200);
                        });
                }
            )
            .catch((e: Error) => res.send(e));
    }
    logout = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        // console.log('Loging out');
        res.clearCookie('token', { httpOnly: true }); // Deletes the cookie it sets the expiration date to an old one
        req.logOut(); // erases the logged user from the requests
        // console.log(req.user);
        res.sendStatus(200);
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
    findUsers = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        // console.log('Execueted  axios ,', req.query.userName);
        // const query = UserModel.find();
        UserModel.find(
            {
                $or: [{ name: { $regex: req.query.userName, $options: 'gim' } },
                { email: { $regex: req.query.userName, $options: 'gim' } }]
            },
            '-id -contacts -conversations -birthdate'
        )
            .then((users) => {
                // console.log(users);
                res.send(users);
            })
            .catch((e) => e);
    }
    rejectContactRequest = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        // console.log('Rejecting contact*********************************');
        const { email } = req.user;
        const { contactEmail } = req.body;
        // console.log('useremail', email);
        // console.log(contactEmail);

        UserModel
            .findOneAndUpdate(
                { email },
                {
                    $pull: {
                        friendRequests: contactEmail
                    }
                },
                { new: true }
            )
            .then((user) => {
                // console.log('***user***: ', user);
                res.send(user);
            })
            .catch((e) => {
                // console.log(e);
                res.send(e);
            });
    }
    getMessages = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        // console.log('Conversation: ', req.body.conversationId);
        ConversationModel.findById(req.body.conversationId)
            .populate({
                path: 'messages',
                populate: {
                    path: 'sender',
                    select: 'email name'
                }
            })
            .populate('participants', 'email')
            .then((conversation) => {
                // console.log('||||||||||||||||', conversation);
                res.send(conversation);
            })
            .catch((e) => res.send(e));
    }
}
