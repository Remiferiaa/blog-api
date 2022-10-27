import mongoose from 'mongoose'
import { Schema, Types } from 'mongoose';

interface IPosts {
    postedAt: Date;
    postTitle: String;
    postBody: String;
    postComments: Types.ObjectId;
}
  
const PostSchema = new Schema<IPosts>({
    postedAt: { type: Date, default: Date.now },
    postTitle: {type: String, required:true}, 
    postBody: {type: String, required:true}, 
    postComments: {type: Schema.Types.ObjectId, ref: 'Message'},
})

PostSchema
    .virtual('published')
    .get(function() {    
        return this.postedAt.toLocaleDateString()
})

export default mongoose.model<IPosts>('Post', PostSchema)