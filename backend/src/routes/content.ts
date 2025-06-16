import { contentModel } from './../model/contentmodel';
import express , {Request, Response} from "express";
import userModel, { linkModel } from "../model/db";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import auth from "../middleware/auth"
import { random } from '../utils';
const router = express.Router();
// router.use(auth);
const key = "123";


router.post('/signup',async (req:Request, res:Response) =>{
    try {
        
        const { username, password } = req.body;
        console.log(username);
        console.log(password);
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await userModel.findOne({ username: username });
        if (existingUser) {
            return res.status(401).json({ message: "User already registered" });
        } else {
            // Hash the password before saving
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const newUser = new userModel({
                username: username,
                password: hashedPassword,
            });

            await newUser.save();
            const token = jwt.sign({ username: newUser._id }, key);
            return res.status(201).json({ message: "User created", token });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to create user" });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const email = req.body.username;
        const epassword = req.body.password;
        // console.log()
        const existingUser = await userModel.findOne({ username: email });
        if (!existingUser) {
            return res.status(401).json({ message: "User not found" });
        }

        // Compare the hashed password
        const isMatch = await bcrypt.compare(epassword, existingUser.password);
        if (isMatch) {
            const token = jwt.sign({ id: existingUser._id }, key);
            return res.status(201).json({ message: "Log in successful", token });
        } else {
            return res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to login user" });
    }
});

router.get('/username',auth,async(req,res)=>{
    //@ts-ignore
    const userId = req.userId;
    const user = await userModel.findById(userId);
    return res.json(user?.username);
})

router.post('/content', auth, async (req: Request, res: Response) => {
    try {
        const { link, title, type } = req.body;

        if (!link || !title || !type) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newContent = new contentModel({
            link,
            title,
            type,
            tags: [], // Empty array or you can pass tags from req.body if necessary
            //@ts-ignore
            userId: req.userId // Ensure req.userId is set properly by your auth middleware
        });

        await newContent.save();
        // await newContent.populate("userId", "username");


        return res.status(201).json({ message: 'Content added successfully' });
    } catch (err) {
        console.error(err);  // Log the error for debugging purposes
        return res.status(500).json({ message: 'Failed to add content' });
    }
});
router.get('/content', auth,async (req: Request, res: Response) => {
    try {
        
        //@ts-ignore
        const userId = req.userId;
        const content = await contentModel.find({ userId }).populate("userId", "username");
        return res.json(content);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to find post" });
    }
});

router.delete('/content/:id',auth,async(req:Request,res:Response)=>{
   try{ 
    // const id = req.body.id;

    const id = (req.params.id);
    // console.log(id)
    //@ts-ignore
    const userId = req.userId;
    const content = await contentModel.findById(id);
    if(!content){
        return res.status(404).json({ message: "Content not found" });
    }
    //@ts-ignore
    if (content.userId.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized to delete this content" });
    }
        await contentModel.findByIdAndDelete(id);
        return res.status(200).json({ message: "Content deleted successfully" });
    }
    catch(err){
                return res.status(500).json({ message: "Failed to delete content" });

    }
})

router.post('/brain/v1/share', auth, async (req, res) => {
    try {
        // console.log("Inside /brain/v1/share");
        // console.log("Request Body:", req.body);
        //@ts-ignore
        // console.log("User ID from token:", req.userId);

        const share = req.body.share;
        if (share) {
            
            const shared= await linkModel.create({
                //@ts-ignore
                userId: req.userId,
                link:  random(10)
            });
            return res.json({ message: "Updated Shareable link",link:shared.link });
        } else {
            await linkModel.deleteOne({
                //@ts-ignore
                userId: req.userId
            });
        }
        return res.json({ message: "Updated Shareable link"});
    } catch (err) {
        console.error("Error in /brain/v1/share", err);
        return res.status(500).json({ message: "Server error updating shareable link" });
    }
});


router.get('/brain/:sharelink',async (req,res)=>{
    try{const hash = (req.params.sharelink);
    const link = await linkModel.findOne({link:hash});
    if(!link){
        return res.status(411).json({message:"Sorry incorrect input"});
    }
    console.log(link);
    const userId= link.userId;
    const user = await userModel.findById(userId);
    const content = await contentModel.find({
        userId:userId
    })
    if(!user){
        return;
    }
return res.status(200).json({ content, username: user.username });}
catch(err){
    return res.status(500).json({message:"Catch block"})
}
})

export default router;