import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const converstationSchema =new Schema({
    participants: [{type: Schema.Types.ObjectId, ref: 'User'}],
    conversationName: String, //{type: String, unique: true, required: false},
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
});
export interface IConversationDocument extends mongoose.Document{
    participants: string[],
    conversationName?: string,
    messages: string[]
}
export const ConversationModel =  mongoose.model<IConversationDocument>('Conversation', converstationSchema);