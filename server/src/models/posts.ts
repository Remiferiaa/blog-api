import mongoose from 'mongoose'
import { Schema, Types } from 'mongoose';
import message from './message';

export interface IPosts {
    postedAt: Date;
    postTitle: String;
    postBody: String;
    postComments: Types.ObjectId;
}

const PostSchema = new Schema<IPosts>({
    postedAt: { type: Date, default: Date.now },
    postTitle: { type: String, required: true },
    postBody: { type: String, required: true },
    postComments: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
})

PostSchema.pre('deleteOne', { document: true }, async function (next) {
    const current = this
    await message.deleteMany({ post: current._id })
    next()
})


PostSchema
    .virtual('published')
    .get(function () {
        return this.postedAt.toLocaleDateString()
    })

export default mongoose.model<IPosts>('Post', PostSchema)