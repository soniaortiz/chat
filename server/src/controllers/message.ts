import {Controller} from './base';
import {MessageModel} from '../models/messageSchema';

export class Message extends Controller{
    model=MessageModel;
}