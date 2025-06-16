export interface Buttonprops {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: any;
  endIcon?: any;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button(props) {
  const variantStyles = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white border border-purple-600 hover:border-purple-700 shadow-sm",
    secondary: "bg-purple-300 hover:bg-purple-50 text-purple-600 border border-purple-300 hover:border-purple-400 shadow-sm"
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-2.5 text-base"
  };

  const baseStyles = "rounded-lg font-medium flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const buttonClass = `${baseStyles} ${variantStyles[props.variant]} ${sizeStyles[props.size]}`;

  return (
    <button 
      type={props.type || "button"} 
      className={buttonClass} 
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.startIcon && (
        <span className="mr-2 flex-shrink-0">
          {props.startIcon}
        </span>
      )}
      
      <span className="whitespace-nowrap">
        {props.text}
      </span>
      
      {props.endIcon && (
        <span className="ml-2 flex-shrink-0">
          {props.endIcon}
        </span>
      )}
    </button>
  );
}