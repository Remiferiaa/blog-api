import mongoose from 'mongoose'
import { Schema} from 'mongoose';
import message from './message';
import {DateTime} from 'luxon'

interface IPosts {
    postedAt: Date;
    postTitle: String;
    postBody: String;
    postComments: Array<string>
}

const PostSchema = new Schema<IPosts>({
    postedAt: { type: Date, default: Date.now },
    postTitle: { type: String, required: true },
    postBody: { type: String, required: true },
    postComments: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
}, {id: false})

PostSchema.pre('deleteOne', { document: true }, async function (next) {
    const current = this
    await message.deleteMany({ post: current._id })
    next()
})

PostSchema
    .virtual('published')
    .get(function () {
        return DateTime.fromJSDate(this.postedAt).toLocaleString(DateTime.DATE_MED);
    })

PostSchema.virtual('commentCount').get(function () {
    return this.postComments.length
});

PostSchema.set('toJSON', { getters: false, virtuals: true })

export default mongoose.model<IPosts>('Post', PostSchema)