import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message: String,
    date: Date,
    sender: {type: Schema.Types.Mixed, ref: 'User'},
    receiver: {type: Schema.Types.Mixed, ref: 'User'},
    conversationId: {type: Schema.Types.Mixed, ref: 'Conversation'}
});
export const Message = mongoose.model('Message', messageSchema);
