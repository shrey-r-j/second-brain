import axios from "axios";
import { useState  } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
export default function Signup(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleSignup = async(e :React.FormEvent)=>{
        e.preventDefault();
        try{
            const response = await axios.post(`${BACKEND_URL}/signup`,{
                username,
                password
            });
            setMessage(response.data.message);
            localStorage.setItem("token",response.data.token);
            navigate('/user/feed');
        }
        catch(err:any){
            setMessage(err.response?.data?.message || "Signup failed");
        }
    }

    return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
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
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-500"
        >
          Sign Up
        </button>
        {message && <p className="mt-2 text-sm text-center">{message}</p>}
      </form>
    </div>
  );
}