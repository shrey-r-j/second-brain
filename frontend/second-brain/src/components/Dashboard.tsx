import { useState } from "react";
import NavBar from "./Navbar";
import Feed from "./Feed";
import AddContent from "./AddContent";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area - Now responsive to sidebar state */}
      <div className="transition-all duration-300 ease-in-out lg:ml-72">
        {/* Navigation */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
          <NavBar onAddContentClick={() => setIsAddOpen(true)} />
        </div>

        {/* Feed Container */}
        <main className={`transition-all duration-300 ${
          isAddOpen 
            ? "filter blur-sm pointer-events-none" 
            : ""
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Feed />
          </div>
        </main>
      </div>

      {/* Modal Overlay */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
              onClick={() => setIsAddOpen(false)}
            />
            
            {/* Modal panel */}
            <div className="relative inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <AddContent onClose={() => setIsAddOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}