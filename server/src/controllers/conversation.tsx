import {Controller} from './base';
import {ConversationModel} from '../models/conversationSchema';

export class Conversation extends Controller{
    model = ConversationModel; 
}