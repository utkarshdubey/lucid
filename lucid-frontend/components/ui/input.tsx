import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Input = React.forwardRef<HTMLTextAreaElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [height, setHeight] = React.useState("h-10");
    const [charCount, setCharCount] = React.useState(0);
    const maxChars = 200; // Set maximum character limit

    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const target = event.target;
      const textLength = target.value.length;

      // Update character count
      setCharCount(textLength);

      // Reset height to auto to get the scrollHeight
      target.style.height = "auto";
      const newHeight = Math.min(target.scrollHeight, 120); // Cap height at 120px (h-30)
      target.style.height = `${newHeight}px`;

      setHeight(newHeight >= 120 ? "h-30" : "h-auto");
    };

    return (
      <div className="relative">
        <textarea
          ref={ref}
          maxLength={maxChars} // Limit max length to 2000 characters
          className={cn(
            `flex ${height} w-full resize-none overflow-hidden rounded-[4px] border border-stroke bg-bgGray px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`,
            className,
          )}
          onInput={handleInput}
          placeholder="Ask Lucid a question..." // Ensure placeholder text is visible
          {...props}
        />
        <div
          className={`absolute bottom-1 right-3 text-xs text-gray-400 ${charCount >= maxChars ? "text-red-400" : ""}`}
          style={{ pointerEvents: "none" }} // Make sure it's non-interactive
        >
          {charCount}/{maxChars}
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
