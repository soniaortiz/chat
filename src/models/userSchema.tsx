import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

    const userSchema = new Schema({
        email: String,
        name: String,
        middleName: String,
        lastName: String,
        birthdate: Date,
        sex: String,
        contacts: [{type: Schema.Types.Mixed, ref: 'User'}],
        conversations: [{type: Schema.Types.ObjectId, ref:'Conversation'}],
        avatar: String
    });

    export const User = mongoose.model('User', userSchema);    
    let queryResult = User.findOne({name: 'sonia'});
    console.log(queryResult);