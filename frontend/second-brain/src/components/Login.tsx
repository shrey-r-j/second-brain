import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";
import {toast} from "react-hot-toast";
export default function Login(){
    const [username,setUsername] = useState("");
    const [password,setPassword]=useState("");
    // const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleLogin = async(e:React.FormEvent)=>{
        e.preventDefault();
        try{
            const response = await axios.post(`${BACKEND_URL}/signin`,
                {username,
                password,}
            );
            // setMessage(response.data.message);
            console.log("Login successfull")
            toast.success('Login successfull !');
            localStorage.setItem("token",response.data.token);
            navigate('/user/feed')
        }
        catch(err:any){
              // setMessage(err.response?.data?.message || "Login failed");
              toast.error("Login failed")
        }
    }
    return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-purple-600">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 rounded hover:bg-green-700"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
