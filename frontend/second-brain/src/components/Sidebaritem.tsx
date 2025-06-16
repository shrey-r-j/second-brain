import type { ReactElement } from "react";

interface SitemProps {
    text: string;
    icon: ReactElement;
    onClick?: () => void;
    isActive?: boolean;
    badge?: string | number;
}

export default function Sitem({ text, icon, onClick, isActive = false, badge }: SitemProps) {
    return (
        <div 
            className={`
                flex items-center justify-between px-3 py-2.5 mx-1 rounded-lg cursor-pointer
                transition-all duration-200 ease-in-out group
                ${isActive 
                    ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-600' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }
                ${onClick ? 'hover:scale-[1.02]' : ''}
            `}
            onClick={onClick}
        >
            <div className="flex items-center space-x-3 flex-1">
                <div className={`
                    flex items-center justify-center w-5 h-5 transition-colors duration-200
                    ${isActive ? 'text-purple-600' : 'text-gray-500 group-hover:text-gray-700'}
                `}>
                    {icon}
                </div>
                <span className={`
                    text-sm font-medium transition-colors duration-200
                    ${isActive ? 'text-purple-700' : 'text-gray-700 group-hover:text-gray-900'}
                `}>
                    {text}
                </span>
            </div>
            
            {badge && (
                <div className="flex items-center justify-center min-w-[20px] h-5 px-2 text-xs font-medium text-white bg-purple-500 rounded-full">
                    {badge}
                </div>
            )}
            
            {onClick && (
                <div className={`
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2
                    ${isActive ? 'opacity-100' : ''}
                `}>
                    <svg 
                        className="w-4 h-4 text-gray-400" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 5l7 7-7 7" 
                        />
                    </svg>
                </div>
            )}
        </div>
    );
}