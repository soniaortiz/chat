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
import * as routes from './controllers/routes';


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
        // const myUser = new User();
        // const myConversation = new Conversation();
        // const myMessage = new Message();

        app.get('/users', routes.user.getAll);//all users
        app.post('/signup', routes.user.signup);
        app.post('/login', routes.user.login);
        app.post('/logout', routes.user.logout);
        app.get('/profile', routes.user.profile);
        // app.post('/user/conversations', myUser.conversations);
        // app.post('/user/friendlist', myUser.friendlist);
        app.post('/conversation/sendmessage', routes.user.sendMessage);
        app.delete('/deletecontact',routes.user.deleteContact);
        app.delete('/deleteconversation', routes.user.delete);
        app.post('/user/acceptfriendrequest', routes.user.acceptFriendRequest)
        // app.get('/user/friendrequestlist', myUser.friendRequestList);
        app.post('/user/sendfriendrequest', routes.user.sendFriendRequest);
        // app.get('/allconversations', myConversation.getAll)
        app.get('/conversations/:_id', routes.conversation.getConversation);
        app.post('/user/conversations/sendmessage',routes.conversation.sendMessage);
        // app.get('/deleteallconversations', myConversation.delete);
        // app.get('/getallmessages', myMessage.getAll);
        app.get('/deletenullconversation', routes.conversation.findnull);
        // app.get('/conversationscount', myConversation.count);

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