import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as errorHandler from 'errorhandler';
import * as validator from 'express-validator';
import * as routes from './controllers/routes';
import { Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import * as passport from 'passport';
import { UserModel } from './models/userSchema';
import { Error } from 'mongoose';
import * as cookieParser from 'cookie-parser';

const cookieExtractor = (req: any) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['token']
    }
    console.log("token: ", token);
    return token;
}
const opts: StrategyOptions = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.SECRET_TOKEN
};

// server use
const url = 'mongodb://localhost:27017/chat';
const app = express();
app.use(express.static(path.join(__dirname, '../build/')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(validator());
app.use(errorHandler());
app.use(cookieParser());

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log("In jwt strategy ", jwt_payload)
    UserModel.findOne({ _id: jwt_payload._id }, ('-password '))
        .then((user) => {
            !user && done(null, false);
            done(null, user);
        })
        .catch((e: Error) => done(e, false))
}));

app.use(passport.initialize());

(mongoose as any).Promise = global.Promise; // Overwrite mongoose promise

// DB connection
mongoose.connect(url).then(() => {
    // console.log("connection with db stablished");
    app.get('/users', routes.user.getAll);
    app.post('/signup', routes.user.signup);
    app.post('/login', routes.user.login);
    app.post('/logout', routes.user.logout);
    app.use(passport.authenticate('jwt', { session: false }));
    app.post('/profile', routes.user.profile);
    app.post('/friendlist', routes.user.friendlist);
    app.post('/conversations', routes.user.conversations);
    app.post('/conversation/sendmessage', routes.user.sendMessage);
    app.delete('/deletecontact', routes.user.deleteContact);
    app.delete('/deleteconversation', routes.user.delete);
    app.post('/user/acceptfriendrequest', routes.user.acceptFriendRequest);
    app.post('/sendfriendrequest', routes.user.sendFriendRequest);
    app.get('/conversations/:_id', routes.conversation.getConversation);
    app.post('/user/conversations/sendmessage', routes.conversation.sendMessage);
    app.get('/deletenullconversation', routes.conversation.findnull);
    app.get('/findUsers', routes.user.findUsers);

    app.get('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.sendFile(path.join(__dirname, '../build/index.html'));
    }
    );
}
).catch((e: Error) => { console.error(e); });

// Create and boot server
app.set('port', 8000);
const server = http.createServer(app);
const boot = () => {
    server.listen(app.listen(app.get('port'), () => {
        console.info('Express server listening on port ' + app.get('port'));
    }));
};
boot();