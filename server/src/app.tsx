import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as errorHandler from 'errorhandler';
import * as validator from 'express-validator';
import {User} from './controllers/user';
import {Conversation} from './controllers/conversation';
import {Message} from './controllers/message';

//server use
    const url = 'mongodb://localhost:27017/chat';
    const app = express();
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
        const myConversation = new Conversation();
        const myMessage = new Message();

        app.get('/users', myUser.getAll);//all users
        app.post('/signup', myUser.signup);
        app.post('/login', myUser.login);
        app.get('/profile', myUser.profile);
        app.post('/user/conversations', myUser.conversations);
        app.post('/user/friendlist', myUser.friendlist);
        app.post('/conversation/sendmessage', myUser.sendMessage);
        app.delete('/deleteuser',myUser.delete);
        app.delete('/deleteconversation', myUser.delete);
        app.post('/user/acceptfriendrequest', myUser.acceptFriendRequest)
        app.get('/user/friendrequestlist', myUser.friendRequestList);
        app.post('/user/sendfriendrequest', myUser.sendFriendRequest);

        app.get('/allconversations', myConversation.getAll)
        app.get('/conversations/:_id', myConversation.getConversation);
        app.post('/user/conversations/sendmessage',myConversation.sendMessage);

        app.get('/deleteallconversations', myConversation.delete);
        app.get('/getallmessages', myMessage.getAll);
        app.get('/deletenullconversation', myConversation.findnull);
        app.get('/conversationscount', myConversation.count);

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