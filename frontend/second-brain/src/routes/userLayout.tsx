import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
const UserLayout = ()=>{
    return(
        <div>
            <Outlet></Outlet>
        </div>
    )
}
export default UserLayout;