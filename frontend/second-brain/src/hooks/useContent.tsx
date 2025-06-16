import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export function useContent(){
    const [content,setContent] = useState([]);
    const intervalId = useRef(null);
    async function fetchContent(token){
            const response = await axios.get(`http://localhost:3000/api/brain/content`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            console.log(response.data);
            setContent(response.data);
        }
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if (!token) {
        toast.error("Token not found. Please log in.");
        return;
      }
        fetchContent(token);
        intervalId.current = setInterval(()=>{
            fetchContent(token);
        },10*1000);
        
        return()=>{
             clearInterval(intervalId.current);
            intervalId.current =null
        }
        
    },[]);
    return {content,setContent}
}