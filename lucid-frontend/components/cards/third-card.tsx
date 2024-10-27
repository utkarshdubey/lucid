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
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                d="M9.293 6.928L14.356 1h-1.2L8.761 6.147 5.25 1H1.2l5.31 7.784L1.2 15h1.2l4.642-5.436L10.751 15h4.05L9.292 6.928zM7.65 8.852l-.538-.775-4.28-6.167h1.842l3.454 4.977.538.775 4.491 6.47h-1.843L7.65 8.852z"
              ></path>
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
