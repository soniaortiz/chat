import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

    const userSchema = new Schema({
        email: {type: String, unique: true},
        name: String,
        middleName: String,
        lastName: String,
        password: String,
        birthdate: Date,
        sex: String,
        contacts: [{type: Schema.Types.ObjectId, ref: 'User'}],
        conversations: [{type: Schema.Types.ObjectId, ref:'Conversation'}],
        avatar: String
    });

    export interface IUserDocument extends mongoose.Document{
        email:string,
        name: string,
        middleName: string,
        lastName: string,
        password: string,
        birthdate: Date,
        sex: string,
        contacts: string[],
        conversations: string[],
        avatar: string
    }
    export const UserModel = mongoose.model<IUserDocument>('User', userSchema)    
