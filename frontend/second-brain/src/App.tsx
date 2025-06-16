import { RouterProvider } from "react-router-dom"
import router from "./routes/route"
// import AddContent from "./components/AddContent";
// import { CreateContent } from "./components/CreateContent";
import { Toaster } from "react-hot-toast"; // ✅ Add this


function App() {
  return (
    <div>
    {/* <CreateContent open={true}></CreateContent> */}
          <Toaster position="top-center" reverseOrder={false} /> {/* ✅ Add this */}
    <RouterProvider router={router}/>
    {/* <AddContent open={"true"}></AddContent> */}
    
    </div>
    )
}

export default App;
