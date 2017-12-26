import {Controller} from './base';
import {UserModel, IUserDocument} from '../models/userSchema';
import {Conversation} from '../models/conversationSchema';

import * as express from 'express';
export class User extends Controller{
    model = UserModel;

    login = (req: express.Request, res: express.Response, next: express.NextFunction)=>{
        console.log("login");
        const {email, password} = req.body;
        console.log(email, password)
        UserModel.findOne({email, password}).then((doc)=>{
            !doc && res.sendStatus(403);//forbidden, user not found
            res.json(doc);
        }).catch((e: Error)=>{
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
            const user = new UserModel(req.body);
            user.save()
                .then((newUser)=>res.json(newUser)); 
        }).catch((e:Error)=>res.send(e))
    }
    profile=(req: express.Request, res: express.Response, next: express.NextFunction)=>{
        // console.log("User profile");
        const {email} =  req.body.email;
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
        const{email}=req.body;
        UserModel.findOne({email: email})
            .then((user)=>{     
                if (user){
                    console.log(user.email)
                    res.send(user.conversations)}
            })
    }
    friendlist=(req: express.Request, res: express.Response, next: express.NextFunction)=>{
        const {email}=req.body;
        UserModel.findOne({email: email})
        .then((user)=>{
            // !user&& res.sendStatus(404);//user not found
            if(user){
                res.send(user.contacts);
            }
        })
    }
    sendFriendRequest=(req: express.Request, res: express.Response, next: express.NextFunction)=>{//Incomplete
    }
    aceptFriendRequest=(req: express.Request, res: express.Response, next: express.NextFunction)=>{
        const {email, email_friend} = req.body; //email is for the user email_friend is of the other user
        const conversation = new Conversation({}).save()
        .then((conversation)=>{
            UserModel.findOneAndUpdate({email}, {$push: {contacts: email_friend, conversations: conversation._id}})
            .then(()=>{
                Conversation.findById(conversation._id).update({$push: {participants: [email, email_friend]}});//adds participants to the conversation
                UserModel.findOneAndUpdate({email_friend},{$push: {contacts: email, conversations: conversation._id}})
            }).catch((e)=>{
                res.send(e);
            });    
        })
   
    }
}