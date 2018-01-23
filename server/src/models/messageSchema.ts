import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    messageContent: String,
    date: Date,
    sender: {type: Schema.Types.ObjectId, ref: 'User'},
});
export const MessageModel = mongoose.model('Message', messageSchema);
