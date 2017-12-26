import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const converstationSchema =new Schema({
    participants: [{type: Schema.Types.ObjectId, ref: 'User'}],
    conversationName: {type: String, unique: true},
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
});

export const Conversation = mongoose.model('Conversation', converstationSchema);