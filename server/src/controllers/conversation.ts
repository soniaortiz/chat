import {Controller} from './base';
import {ConversationModel} from '../models/conversationSchema';
import * as express from 'express';
import { MessageModel } from '../models/messageSchema';

export class Conversation extends Controller{
    model = ConversationModel; 

    findnull=(req: express.Request, res: express.Response, next: express.NextFunction)=>{
        ConversationModel.findOneAndRemove({conversationName: null})
        .then(()=>res.sendStatus(200))
        .catch((e: Error)=>res.send(e))
    }

    getConversation=(req: express.Request, res: express.Response, next: express.NextFunction)=>{
        console.log(req.query._id)
        ConversationModel.findOne({_id: req.query._id})
        // .populate("messages")
        .then((conversation)=>{
            console.log(conversation)
            res.send(conversation)})
        .catch((e: Error)=>res.send(e))
    }

    sendMessage=(req: express.Request, res: express.Response, next: express.NextFunction)=>{
        const {conversation_id} = req.body; 
        new MessageModel({date: new Date(), sender: req.body.sender_id, messageContent: req.body.message_content})
        .save()
        .then((message)=>{
            console.log("The message ", message);
            return ConversationModel.findByIdAndUpdate(conversation_id, {$push: {messages: message._id}}, {new: true}).exec()
        })
        .then((conversation)=>{
            res.send(conversation)})
        .catch((e:Error)=>res.send(e))
    }
}