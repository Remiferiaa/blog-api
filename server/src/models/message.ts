import mongoose from 'mongoose'
import { Schema, Types } from 'mongoose';
import posts from './posts';
import { DateTime } from 'luxon';

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

MessageSchema.pre('deleteOne', { document: true }, async function (next) {
    const current = this
    await posts.updateOne({ _id: current.post }, { "$pull": { postComments: current._id } })
    next()
})

MessageSchema
    .virtual('posted')
    .get(function () {
        return DateTime.fromJSDate(this.postedAt).toLocaleString(DateTime.DATE_MED);
    })

MessageSchema.set('toJSON', { getters: false, virtuals: true })

export default mongoose.model<IMsg>('Message', MessageSchema)
