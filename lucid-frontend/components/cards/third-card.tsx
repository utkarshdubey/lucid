/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import thumbsUpAsset from "@/public/assets/thumbsUp.png";

export default function ThirdCard() {
  return (
    <div className="h-15 w-full cursor-pointer self-center py-5">
      <motion.div
        className="absolute -bottom-8 right-11 rotate-[5.6deg]"
        variants={{
          initial: {
            y: 100,
            x: 100,
          },
          animate: {
            y: 0,
            x: 0,
            transition: {
              duration: 0.5,
              delay: 0.3,
              ease: "easeInOut",
            },
          },
        }}
      >
        <Image
          src={thumbsUpAsset}
          height={78}
          width={78}
          alt="A thumbs up 3d illustration."
        />
      </motion.div>
      <div className="ml-auto mr-auto flex w-[calc(100%-40px)]">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-[9px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z"></path>
            </svg>
            <span className="text-sm">Visit our Devpost</span>
          </div>
          <div>
            <ChevronRightIcon className="currentColor h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
