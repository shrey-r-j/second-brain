import { useEffect, useState } from "react";
import { TwitterIcon } from "../icons/TwiiterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { B } from "../icons/BrainLogo";
import Sitem from "./Sidebaritem";

import { DocIcon } from "../icons/DocIcon";
import { useNavigate } from "react-router-dom";
import useUsername from "../hooks/useUsername";

export default function Sidebar() {
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const profile = useUsername();
    
    return (
        <>
            {/* Toggle Button - Always visible */}
            <div className="top-4  ">
        <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="
            p-2 bg-white border border-gray-200 rounded-lg shadow-md
            hover:bg-gray-50 transition-all duration-300 ease-in-out
        "
    >
        <svg 
            className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                isCollapsed ? 'rotate-0' : 'rotate-180'
            }`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
            />
        </svg>
    </button>
</div>


            {/* Sidebar */}
            <div className={`
                h-screen bg-white border-r border-gray-200 fixed left-0 top-0 flex flex-col shadow-lg
                transition-all duration-300 ease-in-out z-40
                ${isCollapsed ? '-translate-x-full' : 'translate-x-0 w-72'}
            `}>
                {/* Header Section */}
                <div className="flex items-center px-6 py-6 border-b border-gray-100" onClick={() => setIsCollapsed(!isCollapsed)}>
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <B />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                            Brainly
                        </div>
                        <div>
                            
                        </div>
                    </div>
                </div>

                {/* Navigation Section */}
                <nav className="flex-1 px-4 py-6">
                    <div className="space-y-2">
                        <div className="px-3 mb-4">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Content Sources
                            </h3>
                        </div>
                        
                        <Sitem 
                            text="Twitter" 
                            icon={<TwitterIcon />}
                        />
                        <Sitem 
                            text="Youtube" 
                            icon={<YoutubeIcon />}
                        />
                        
                        <div className="pt-6">
                            <div className="px-3 mb-4">
                                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Discover
                                </h3>
                            </div>
                            <Sitem 
                                text="Find Brain" 
                                icon={<DocIcon />} 
                                onClick={() => { navigate("/user/findbrain") }}
                            />
                        </div>
                    </div>
                </nav>

                {/* Footer Section */}
                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center space-x-3 px-3 py-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-purple-600">U</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {profile}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                Manage your brain
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile - closes sidebar when clicked */}
            {!isCollapsed && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-25 z-30 lg:hidden"
                    onClick={() => setIsCollapsed(true)}
                />
            )}
        </>
    );
}