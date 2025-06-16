import mongoose, { Types } from "mongoose";

const contentTypes = ['youtube', 'twitter', 'document', 'audio']; // Extend as needed

const contentSchema = new mongoose.Schema({
    link : String,
    type: {type:String,enum:contentTypes},
    title: { type: String, required: true },
    tags :[{type :Types.ObjectId,ref:'Tag'}],
    userId :{type:mongoose.Types.ObjectId,ref:'user'}
})

export const contentModel = mongoose.model("Content",contentSchema);

const tagSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true }
})
export const Tag = mongoose.model('Tag', tagSchema);
