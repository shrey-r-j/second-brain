import { createBrowserRouter } from "react-router-dom";
import UserLayout from "./userLayout";
// import Feed from "../components/Feed";
// import AddContent from "../components/AddContent";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import Signup from "../components/Signup";
import FindBrain from "../components/FindBrain";
const router = createBrowserRouter([
    {path:'/',element:<Signup></Signup>},
    {path :'/login' , element:<Login></Login>},
    {path:'/user',element:<UserLayout></UserLayout>,
        children:[
            {path : "feed",element:<Dashboard></Dashboard>},
            {path :"findbrain",element:<FindBrain></FindBrain>}
        ]
    },
    
])

export default router;