import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

    export const userSchema = new Schema({
        email: {type: String, unique: true, lowercase: true},
        name: String,
        middleName: String,
        lastName: String,
        password: {type: String},
        birthdate: Date,
        gender: String,
        contacts: [{type: Schema.Types.ObjectId, ref: 'User'}],
        conversations: [{type: Schema.Types.ObjectId, ref:'Conversation'}],
        friendRequests: [{type: Schema.Types.ObjectId, ref: 'User'}],
        avatar: String
    });

    export interface IUserDocument extends mongoose.Document{
        email:string,
        name: string,
        middleName: string,
        lastName: string,
        password: string,
        birthdate: Date,
        gender: string,
        contacts?: string[],
        conversations?: string[],
        friendRequests?: string[],
        avatar?: string
    }

    userSchema.set('toJSON', {       
        transform: function(doc: IUserDocument, user:IUserDocument , options: any){
            delete user.password;
            delete user._id;
            console.log('TRANSFORMMM', user);
            return user;
        }
    })

    userSchema.pre('save', function (this: IUserDocument, next){
        const user = this;
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(user.password, salt, function(err, hash){
                user.password=hash;
                next();
            })
        })
    })

    export const UserModel = mongoose.model<IUserDocument>('User', userSchema);