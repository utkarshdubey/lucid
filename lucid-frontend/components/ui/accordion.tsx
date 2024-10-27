"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("rounded-[4px]", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  // Change this for the cursor pointer
  <AccordionPrimitive.Header className="flex cursor-default">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 cursor-default items-center justify-between rounded-[4px] bg-bgGray p-3 text-sm font-medium text-black transition-all data-[state=open]:rounded-[0px_0px_4px_4px] [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      // pb-[5px] pl-2 pr-2 pt-2
      {...props}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="17"
        fill="none"
        viewBox="0 0 16 17"
        className="shrink-0 transition-transform duration-200"
      >
        <path
          fill="#1A1A1A"
          d="M9.007 10.633L10.32 9.32l2.14-2.14a.721.721 0 00-.513-1.227H4.053c-.64 0-.96.773-.506 1.227L7 10.633a1.42 1.42 0 002.007 0z"
        ></path>
      </svg>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden rounded-[0px_0px_4px_4px] bg-bgGray text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div
      className={cn("pb-3 pl-3 pr-3 pt-0 font-normal text-textGray", className)}
      // pb-2 pl-2 pr-2 pt-0
    >
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
