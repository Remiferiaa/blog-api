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

function removeLinkDoc(doc: IPosts) {
    message.remove({ _id: { $in: doc.postComments}})
}

PostSchema
    .virtual('published')
    .get(function () {
        return this.postedAt.toLocaleDateString()
    })

PostSchema.post('remove', removeLinkDoc)

export default mongoose.model<IPosts>('Post', PostSchema)