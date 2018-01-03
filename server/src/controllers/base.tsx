import * as express from 'express';
import { MongooseDocument, Error} from 'mongoose';

export abstract class  Controller {//for shared methods in the classes
    constructor() {        
    }
    abstract model: any;
    getAll=(req: express.Request, res: express.Response, next: express.NextFunction)=>{
        this.model.find({}).then(
            (docs: MongooseDocument[])=>res.json(docs)
        ).catch((e: Error)=>res.send(e));
    }
    count=(req: express.Request, res: express.Response, next: express.NextFunction)=>{
        this.model.count().then((count: number)=>{
            res.json(count)
        }
        ).catch((e: Error)=>e)
    }
    insert=(req: express.Request, res: express.Response, next: express.NextFunction)=>{
        const obj = new this.model(req.body);
        this.model.save(obj)
        .then((doc: MongooseDocument)=>res.send(obj))
        .catch((e:Error)=>res.sendStatus(400))//to verify duplicated key, still missing verification part
    }
    get = (req: express.Request, res: express.Response, next: express.NextFunction)=>{
        const id = req.body.id;
        this.model.findById(id)
        .then((doc: MongooseDocument)=>res.json(doc))
        .catch((e: Error)=>e)
    }
    update =  (req: express.Request, res: express.Response, next: express.NextFunction)=>{
        const id = req.body.id, 
        obj = req.body.id;
        this.model.findOneAndUpdate(id,obj)
        .then(()=>res.sendStatus(200))
        .catch((e: Error)=>e)
    }
    delete=(req: express.Request, res: express.Response, next: express.NextFunction)=>{
        const id = req.body.id;
        this.model.findOneAndRemove(id)
        .then(()=>res.send(200))
        .catch((e: Error)=>e)
    }
}