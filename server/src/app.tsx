import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as mongodb from 'mongodb';
import * as bodyParser from 'body-parser';
import * as errorHandler from 'errorhandler';
import * as validator from 'express-validator';
// import { UserModel, ConversationModel, MessageModel} from './models/models';
import { MongooseDocument } from 'mongoose';
import { log } from 'util';
import * as graphqlHTTP from 'express-graphql';
import { graphql } from 'graphql/graphql';
import { GraphQLSchema } from 'graphql/type/schema';
import {User} from './controllers/user'
//server use
    const url = 'mongodb://localhost:27017/chat';
    const app = express();
    const port = 3000;
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(validator());
    app.use(errorHandler());
    (mongoose as any).Promise = global.Promise; //Overwrite mongoose promise

//DB connection
    mongoose.connect(url).then(()=>{
        console.log("connection with db stablished");
        const myUser = new User();
        app.get('/users', myUser.getAll);//all users
        app.post('/signup', myUser.signup);
        app.post('/login', myUser.login);
        app.post('/profile', myUser.profile);
        app.post('/user/conversations', myUser.conversations);
        app.post('/user/friendlist', myUser.friendlist);

        
        // app.get('user/conversations', (req, res, next)=>{
        //     console.log("Serving conversations");
        //     User.findById(req.query._id)
        //     .then((user)=>{
        //         !user && res.send(404).send('User not found');
        //         console.log("Sending conversations");
        //         Conversation.find()
        //         .then((conversations)=>{
        //             res.send(conversations);//will send all conversations of the user
        //         })
        //     })
        // });
        // app.get('/user/conversations/:_id', (req, res, next)=>{
        //         console.log("Serving conversation");
        //         Conversation.findById(req.query.conversation_id)//conversation id
        //         .then((conversation)=>{
        //             // !conversation && res.send(404);
        //             res.send(conversation);
        //         })                
        // });
        // app.get('user/addcontact', (req, res, next)=>{
        //     //create conversation when accepted
        //     //pass the id of contact that want to add
        //     res.send(200);
        // });
        // app.post('/user/aceptfriendrequest', (req, res, next)=>{
        //     const conversation = new Conversation({name: 'test'}).save()
        //     .then((conversation)=>{
        //         User.findById(req.body.user_id)
        //         .update({$push: {contacts: req.body.request_user_id, conversations: conversation._id}})//adds contact and create conversation
                
        //         .then(()=>{
        //             Conversation.findById(conversation._id).update({$push: {participants: [req.body.user_id, req.body.request_user_id]}});//adds participants to the conversation
        //             User.findById(req.body.request_user_id).update({$push: {contacts: req.body.user_id, conversations: conversation._id}})
        //             .then(()=>{
        //                 res.send(conversation);
        //             })
        //         }).catch((e)=>{
        //             res.send(e);
        //         });    
        //     })
        // });
        // app.get('/users', (req, res, next)=>{
        //     User.find()
        //     .then((users)=>{
        //         res.send(users)
        //     })
        // });
        // app.get('/conversations', (req, res, next)=>{
        //     Conversation.find()
        //     .then((conversation)=>{
        //         res.send(conversation)
        //     })
        // });
        // app.get('/deleteusers', (req, res, next)=>{
        //     User.find({},(users)=>{
        //         res.send(users)
        //         // console.log(users)
        //     }).then((users)=>{
        //         users.forEach((user, i)=>{
        //             console.log("usuario ", i, " : ", user)
        //             users[i].remove();
        //         })
        //     })
        // });
        // app.post('/user/sendmessage', (req, res, next)=>{
        //     let theMessage = new Message({
        //         messageContent: req.body.messageContent,
        //         sender: req.body.sender,
        //         receiver: req.body.receiver}).save().then(
        //         (m)=>{//after the message is created then the reference is passed to the conversation
        //             Conversation.findById({_id: req.body.conversation_id}).update({$push: {messages: m._id}})
        //             .then(()=>res.send(200))
        //         }
        //     );
        // });
        app.get('*', (req: express.Request, res: express.Response, next: express.NextFunction)=>{
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });      
        }
    ).catch((e: Error)=>{console.error(e);}); 

//Create and boot server
    app.set('port', 3000);
    const server = http.createServer(app);
    const boot =  ()=>{
        server.listen(app.listen(app.get('port'), ()=>{
            console.info('Express server listening on port '+ app.get('port'));
        }))
    };
    boot();
