import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as mongodb from 'mongodb';
import * as bodyParser from 'body-parser';
import * as errorHandler from 'errorhandler';
import * as validator from 'express-validator';
import { User } from './models/models';
import { MongooseDocument } from 'mongoose';
import { log } from 'util';
import * as graphqlHTTP from 'express-graphql';
import { graphql } from 'graphql/graphql';
import { GraphQLSchema } from 'graphql/type/schema';

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
        app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction)=>{
            console.log("Send response");
            // User.create
            res.send();
        });
        app.get('/login', (req: express.Request, res: express.Response, next: express.NextFunction)=>{
            console.log("login");
            console.log("Env port: " , process.env.PORT);
            // console.log(req.query);
            res.send('route with react');
        });
        app.post('/login', (req: express.Request, res: express.Response, next: express.NextFunction)=>{
            // console.log(req.body);
            User.findOne({email: req.body.email}).then((doc)=>{
                 console.log(doc);
            }).catch((e: Error)=>{
                console.log("User not found");
            })
            res.send("found");
        })
        app.post('/singin', (req: express.Request, res: express.Response, next: express.NextFunction)=>{
            console.log("Register user");
            User.collection.insert(req.body.email).then(
                ()=>{
                    console.log("request", req.body)
                    res.send("inserted");
                }
            ).catch((e: Error)=>console.error(e))
        })
        app.get('/user', (req: express.Request, res: express.Response, next: express.NextFunction)=>{
            console.log("User profile");
            User.collection.findOne({}).then(
                ()=>console.log("this is my profile")
            )
        })
        app.get('/dashboard', (req: express.Request, res: express.Response, next: express.NextFunction)=>{
            console.log("Dashboard after authenticated");
        })
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
