import {Controller} from './base';
import {UserModel} from '../models/userSchema';
import {ConversationModel} from '../models/conversationSchema';
import {MessageModel} from '../models/messageSchema';
import * as express from 'express';
import { Error} from 'mongoose';
export class User extends Controller{
    model = UserModel;

    login = (req: express.Request, res: express.Response, next: express.NextFunction)=>{
        console.log("login");
        const {email, password} = req.body;
        console.log(email, password)
        UserModel.findOne({email, password})
            .then((doc)=>{
                !doc && res.sendStatus(403);//forbidden, user not found
                res.json(doc);
            })
            .catch((e: Error)=>{
                res.send(e);
            })
    }
    signup= (req: express.Request, res: express.Response, next: express.NextFunction)=>{
        // console.log("Register user", req.body);
        const {email} = req.body; 
        UserModel.findOne({email: email})
        .then((doc)=>{
            if(doc)
                res.send(409).write('User already created');//Conflict, user
            return new UserModel(req.body).save()
        })
        .then((newUser)=>res.json(newUser))
        .catch((e:Error)=>res.send(e))
    }
    profile=(req: express.Request, res: express.Response, next: express.NextFunction)=>{
        // console.log("User profile");
        const {email} =  req.query.email;
        console.log(email)
        UserModel.findOne(email)
        .then(
            (user)=>{
                !user && res.status(404).send("User not found");
                res.json(user);//send the user
            })
    }
    conversations=(req: express.Request, res: express.Response, next: express.NextFunction)=>{
        console.log("Conversations")
        const{user_id}=req.body;
        UserModel.findById({_id: user_id})
        .populate("conversations")
        .then((user)=>{     
            if (user){
                console.log(user.email)
                res.send(user.conversations)}
        })
    }
    friendlist=(req: express.Request, res: express.Response, next: express.NextFunction)=>{
        const {user_id}=req.body;
        UserModel.findById({_id: user_id}).populate("contacts")
        .then((user)=>{
            if(user){
                res.send(user.contacts);
            }
        })
    }
    sendFriendRequest=(req: express.Request, res: express.Response, next: express.NextFunction)=>{//Incomplete
        //find the friend
        UserModel.findOneAndUpdate({_id: req.body.friend_id}, 
            {$push:{friendRequests: req.body.sender_id}})//
        .then((friend)=>{
            res.send(200);
        })
    }
    friendRequestList=(req: express.Request, res: express.Response, next: express.NextFunction)=>{//see friend request list
        UserModel.findById(req.query._id)
        .then((user)=>{
            if(user){
                // const friendList = user.friendRequests;
                // friendList.forEach((i)=>{
                //     console.log(i)
                // })
                res.send(user.friendRequests)
            }
        })
        .catch((e:Error)=>res.send(e))
    }
    acceptFriendRequest=(req: express.Request, res: express.Response, next: express.NextFunction)=>{
        const {user_id, request_id}=req.body;
        new ConversationModel({conversationName: req.body.conver_name})
        .save()
        .then((conversation)=>{
            return (UserModel.findByIdAndUpdate(user_id,{$pull:{friendRequests: request_id}, 
                $push:{contacts: request_id, conversations: conversation._id}}, {new: true}).exec(),conversation);
        })
        .then((conversation)=>{            
            return UserModel.findByIdAndUpdate(request_id, {$push: {contacts: user_id, conversations: conversation._id}}, {new: true}).exec();
        })
        .then((user)=>{
            res.send(user)
        })
        .catch((e)=>res.send(e));
    }
    sendMessage=(req: express.Request, res: express.Response, next: express.NextFunction)=>{
        new MessageModel({
            messageContent: req.body.messageContent,
            sender: req.body.sender
        })
        .save()
        .then(
            (m)=>{//after the message is created then the reference is passed to the conversation
                ConversationModel
                .findOneAndUpdate({
                    _id: req.body.conversation_id}, {$push: {messages: m._id}
                });
            }
        )
        .then((conversation)=>res.send(conversation))
        .catch((e:Error)=>res.send(e));        
    }

    }
