import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const converstationSchema =new Schema({
    participants: [{type: Schema.Types.ObjectId, ref: 'Users'}],
    conversationName: String
});

export const Conversation = mongoose.model('Conversation', converstationSchema);