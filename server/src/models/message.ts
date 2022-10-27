import mongoose from 'mongoose'
import { Schema } from 'mongoose';

interface IMsg {
    postedAt: Date;
    msgTitle: String;
    msgBody: String;
}
  
const MessageSchema = new Schema<IMsg>({
    postedAt: { type: Date, default: Date.now },
    msgTitle: { type: String, required: true },
    msgBody: { type: String, required: true }
})

MessageSchema
    .virtual('posted')
    .get(function() {    
        return this.postedAt.toLocaleDateString()
})

export default mongoose.model<IMsg>('Message', MessageSchema)
