import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, type, startAdornment, endAdornment, children, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full rounded-2xl border border-input bg-transparent px-2 py-2 text-md shadow-sm transition-colors placeholder:text-muted-foreground focus-within:border-primary transition-all ease-in-out">
        {startAdornment}
        <input
          type={type}
          className={cn("px-1 flex-1 h-[40px] outline-none", className)}
          ref={ref}
          {...props}
        />
        {endAdornment}
        {children}
      </div>
    );
  },
);
TextField.displayName = "TextField";

export { TextField };
