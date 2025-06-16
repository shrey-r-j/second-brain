import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../config";
export default function useUsername(){
    const [profile,setprofile] = useState("");
    useEffect(()=>{
        async function fetchProfile(){
            try{
            const token = localStorage.getItem("token")
            if (!token) {
            toast.error("Token not found. Please log in.");
            return;
            }
            console.log("Hi")
            const response = await axios.get(`${BACKEND_URL}/username`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setprofile(response.data);
            // console.log(response);
            }
            catch(err){
                return ;
            } 
        }
       fetchProfile(); 
    },[]);
    return profile
}