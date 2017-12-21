import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message: String,
    date: Date,
    sender: {type: Schema.Types.ObjectId, ref: 'User'},
    receiver: {type: Schema.Types.ObjectId, ref: 'User'},
});
export const Message = mongoose.model('Message', messageSchema);
