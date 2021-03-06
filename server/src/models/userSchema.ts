import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'bson';
import { IConversationDocument } from './conversationSchema';

const Schema = mongoose.Schema;

export const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    name: String,
    middleName: String,
    lastName: String,
    password: { type: String },
    birthdate: Date,
    gender: String,
    contacts: [{type: Schema.Types.ObjectId, ref: 'User'}], // must be the contact id
    conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }],
    //   friends: [{ type: ObjectId, ref: 'User' }]
    friendRequests: [String],
    avatar: String
});

export interface IUserDocument extends mongoose.Document {
    email: string;
    name: string;
    middleName: string;
    lastName: string;
    password: string;
    birthdate: Date;
    gender: string;
    contacts?: string[];
    conversations?: Array<string| IConversationDocument>;
    friendRequests?: string[];
    avatar?: string;
}

userSchema.set('toJSON', {
    transform: function (doc: IUserDocument, user: IUserDocument, options: any) {
        delete user.password;
        delete user._id;
        // console.log('TRANSFORMMM', user);
        return user;
    }
})

userSchema.pre('save', function (this: IUserDocument, next) {
    const user = this;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            next();
        })
    })
})

export const UserModel = mongoose.model<IUserDocument>('User', userSchema);