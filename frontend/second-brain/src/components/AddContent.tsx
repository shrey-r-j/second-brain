import { useState } from "react";
import { CloseIcon } from "../icons/CrossIcon";
import axios from "axios";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import Button from "./Button";
import { TwitterIcon } from "../icons/TwiiterIcon";
import { DocIcon } from "../icons/DocIcon";
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";

export default function AddContent({ onClose }: { onClose: () => void }) {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault();
    try{
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token not found. Please log in.");
        return;
      }
      const contentData = {
        link,title,type,
      }
      console.log(contentData);
      const response = await axios.post(`${BACKEND_URL}/content`,contentData,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      toast.success("Content added successfully");
      setLink("");
      setTitle("");
    }
    catch(err){
      console.error("Upload error:", err);
      toast.error("Failed to upload post");
    }
  }

  return (
    <div>
      {/* <h2 className="text-xl font-semibold mb-4">Add New Content</h2> */}
      <div className="text-gray-500 flex justify-end" onClick={onClose}>
            <CloseIcon/>
        </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Link"
          className="w-full p-2 border rounded"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
        <h1 className="text-purple-950 text-lg">Type :-</h1>
        <div className="flex items-center justify-around">
          
        <div>
         <Button type="button"   variant={type === "youtube" ? "primary" : "secondary"} size="md" text="Youtube" startIcon={<YoutubeIcon></YoutubeIcon>} onClick={()=>{setType("youtube")} }/>
        </div>
        <div>
          <Button type="button"   variant={type === "twitter" ? "primary" : "secondary"}size="md" text="Twitter" startIcon={<TwitterIcon></TwitterIcon>} onClick={()=>{setType("twitter")}}></Button>
        </div>
        <div>
          <Button 
            type="button" variant="secondary" size="md" text="Document" startIcon={<DocIcon></DocIcon>} onClick={()=>{setType("document")}}></Button>
        </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-purple-500 text-white px-8 py-2 rounded hover:bg-blue-700"
          >
            Post Your Brain
          </button>
        </div>
        {message && (
          <p className="mt-2 text-sm text-gray-600 text-center">{message}</p>
        )}
      </form>
    </div>
  );
}
