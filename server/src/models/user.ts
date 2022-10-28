import mongoose from 'mongoose'
import { Schema } from 'mongoose';

interface IUser {
    username: 'string',
    password: 'string'
}
  
const UserSchema = new Schema<IUser>({
    username: { type: String},
    password: { type: String}
})


export default mongoose.model<IUser>('User', UserSchema)
