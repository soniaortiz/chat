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
import {Strategy, StrategyOptions, ExtractJwt} from 'passport-jwt';
import * as passport from 'passport'
import {UserModel} from './models/userSchema';
import { error } from 'util';
import { Error } from 'mongoose'; 

const opts: StrategyOptions ={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_TOKEN
 };
 //server use
    const url = 'mongodb://localhost:27017/chat';
    const app = express();
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(validator());
    app.use(errorHandler());

    passport.use(new Strategy(opts, (jwt_payload, done)=>{
        UserModel.findOne({_id: jwt_payload._id})
        .then((user)=>{
            !user && done(null, false)
            done(null, user)
        })
        .catch((e:Error)=>done(e, false))
    }));

    app.use(passport.initialize());

    (mongoose as any).Promise = global.Promise; //Overwrite mongoose promise
//DB connection
    mongoose.connect(url).then(()=>{
        console.log("connection with db stablished");

        app.post('/signup', routes.user.signup);
        app.post('/login', routes.user.login);
        app.post('/logout', routes.user.logout);
        app.post('/profile', routes.user.profile);

        app.get('/users', routes.user.getAll);
        // app.post('/user/conversations', myUser.conversations);
        // app.post('/user/friendlist', myUser.friendlist);

        app.post('/conversation/sendmessage', routes.user.sendMessage); 
        app.delete('/deletecontact',routes.user.deleteContact);
        app.delete('/deleteconversation', routes.user.delete);
        app.post('/user/acceptfriendrequest', routes.user.acceptFriendRequest);

        // app.get('/user/friendrequestlist', myUser.friendRequestList);
        app.post('/user/sendfriendrequest', routes.user.sendFriendRequest);
        // app.get('/allconversations', myConversation.getAll);

        app.get('/conversations/:_id', routes.conversation.getConversation);
        app.post('/user/conversations/sendmessage',routes.conversation.sendMessage);
        // app.get('/deleteallconversations', myConversation.delete);

        app.get('/deletenullconversation', routes.conversation.findnull);
        app.get('*', (req: express.Request, res: express.Response, next: express.NextFunction)=>{
            res.sendFile(path.join(__dirname, '../public/index.html'));
            }
        );      
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