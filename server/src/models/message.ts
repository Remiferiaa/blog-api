import mongoose from 'mongoose'
import { Schema, Types } from 'mongoose';

export interface IMsg {
    postedAt: Date;
    msgTitle: String;
    msgBody: String;
    post: Types.ObjectId;
}
  
const MessageSchema = new Schema<IMsg>({
    postedAt: { type: Date, default: Date.now },
    msgTitle: { type: String, required: true },
    msgBody: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post' }
})

MessageSchema
    .virtual('posted')
    .get(function() {    
        return this.postedAt.toLocaleDateString()
})

export default mongoose.model<IMsg>('Message', MessageSchema)
