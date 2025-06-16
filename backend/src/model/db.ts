import mongoose, { Types } from "mongoose";
import { random } from "../utils";
const userSchema = new mongoose.Schema({
    username : {type:String,unique:true},
    password :String
})

const userModel = mongoose.model("user",userSchema);
export default userModel

const LinkSchema = new mongoose.Schema({
    link :String,
    userId : {type :mongoose.Types.ObjectId,ref:"user",required:true},
    // hash: { type: String, required: true, unique: true } // ✅ add this

})

export const linkModel = mongoose.model("link", LinkSchema);
