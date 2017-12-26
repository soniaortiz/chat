import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as mongoose from 'mongoose';
// import * as mongodb from 'mongodb';
import * as bodyParser from 'body-parser';
import * as errorHandler from 'errorhandler';
import * as validator from 'express-validator';
import {User} from './controllers/user'
//server use
    const url = 'mongodb://localhost:27017/chat';
    const app = express();
    // const port = 3000;
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
        app.post('/conversation/sendmessage', myUser.sendMessage);
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
