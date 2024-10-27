"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import inflatableAsset from "@/public/assets/inflatable.png";

export default function FirstCard() {
  return (
    <div className="w-full">
      <motion.div
        className="absolute -right-14 -top-16 -rotate-[3.5deg]"
        variants={{
          initial: { y: -100, x: -100 },
          animate: {
            y: 0,
            x: 0,
            transition: { duration: 0.5, delay: 0.2, ease: "easeInOut" },
          },
        }}
      >
        <Image
          src={inflatableAsset}
          height={160}
          width={160}
          alt="An inflatable balloon in a four-shaped 3D illustration."
        />
      </motion.div>
      <div className="ml-auto mr-auto flex w-[calc(100%-40px)] flex-col items-start gap-4 py-4">
        <div className="flex flex-col">
        <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
          height="24"
          fill="currentColor"
          className="w-6 h-6 text-gray-800 dark:text-white"
          viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M3 4a1 1 0 00-.822 1.57L6.632 12l-4.454 6.43A1 1 0 003 20h13.153a1 1 0 00.822-.43l4.847-7a1 1 0 000-1.14l-4.847-7a1 1 0 00-.822-.43H3z"
        clipRule="evenodd"
      ></path>
    </svg>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-black">
            Lucid: <span className="text-darkGray">AI-Powered Educational Videos</span>
          </h1>
          <p className="text-sm font-medium">
            Experience math and science like never before with our AI-generated, 3b1b-inspired animated videos. Dive into complex topics with clarity and ease.
          </p>
        </div>
        <div className="w-full">
          <FAQ />
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");

  const videos = [
    { title: "AC Current", file: "/videos/ac_current.mp4" },
    { title: "How Airplane Wings Generate Lift", file: "/videos/airplane.mp4" },
    { title: "What are Neural Networks", file: "/videos/neural_networks.mp4" },
  ];

  const playVideo = (videoUrl: string) => {
    setCurrentVideo(videoUrl);
    setVideoOpen(true);
  };

  return (
    <>
      <Accordion
        type="single"
        defaultValue="item-1"
        collapsible
        className="w-full space-y-2"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            What are some things you can learn?
          </AccordionTrigger>
          <AccordionContent className="space-y-2">
            {videos.map((video, index) => (
              <div
                key={index}
                className="cursor-pointer hover:text-blue-600"
                onClick={() => playVideo(video.file)}
                aria-label={`Play video about ${video.title}`}
              >
                {video.title}
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="aspect-w-16 aspect-h-9 rounded-lg border border-white bg-white p-4 shadow-lg sm:max-h-[90vh] sm:max-w-[90vw]">
          <div
            className="relative h-0 w-full"
            style={{ paddingBottom: "56.25%" }}
          >
            <video
              className="absolute left-0 top-0 h-full w-full"
              src={currentVideo}
              controls
              autoPlay
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
