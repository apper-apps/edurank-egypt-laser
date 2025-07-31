import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className, 
  type = "text",
  as = "input",
  ...props 
}, ref) => {
  const Component = as;
  
  return (
    <Component
      type={as === "input" ? type : undefined}
      className={cn(
        "flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
        as === "textarea" ? "min-h-[80px] resize-none" : "h-10",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;