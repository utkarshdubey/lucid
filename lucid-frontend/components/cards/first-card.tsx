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
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 2000.000000 1500.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,1500.000000) scale(0.100000,-0.100000)"
              fill="#000000"
              stroke="none"
            >
              <path
                d="M0 7500 l0 -7500 10000 0 10000 0 0 7500 0 7500 -10000 0 -10000 0 0
-7500z m10216 4788 c331 -116 667 -427 987 -914 530 -806 870 -1928 938 -3099
15 -255 7 -812 -15 -1035 -64 -648 -210 -1258 -437 -1828 -232 -582 -476 -992
-798 -1342 -148 -160 -192 -201 -308 -289 -257 -194 -499 -266 -710 -213 -162
41 -338 137 -508 276 -93 76 -336 332 -426 448 -219 284 -433 662 -603 1067
-416 991 -584 2165 -470 3281 106 1036 442 2026 935 2755 328 485 708 815
1041 905 104 28 274 23 374 -12z m3210 -883 c275 -81 457 -548 526 -1345 16
-185 16 -813 0 -1030 -57 -773 -191 -1550 -377 -2190 -97 -332 -252 -745 -392
-1045 -41 -88 -82 -176 -90 -196 -14 -34 -26 -41 -156 -99 -303 -134 -832
-406 -1102 -565 -29 -17 -31 -17 -67 4 l-36 22 45 102 c327 736 523 1551 574
2382 15 239 6 857 -15 1085 -51 544 -147 1042 -292 1519 -24 79 -44 150 -44
157 0 19 281 389 399 526 325 376 634 618 859 673 75 18 108 18 168 0z m-6731
-60 c92 -23 249 -106 370 -197 133 -99 427 -390 579 -573 94 -114 300 -378
319 -412 4 -7 -12 -76 -37 -155 -130 -420 -222 -881 -270 -1353 -53 -507 -45
-1131 20 -1630 86 -665 282 -1357 554 -1955 33 -73 60 -136 60 -139 0 -4 -16
-15 -36 -26 l-36 -19 -42 23 c-349 194 -747 389 -1116 547 -63 27 -120 56
-127 64 -17 22 -175 357 -248 529 -375 878 -627 2039 -686 3166 -14 264 -6
744 16 965 59 593 211 1009 413 1127 94 55 161 65 267 38z m8814 -2726 c-183
-791 -515 -1548 -968 -2204 -92 -134 -283 -386 -295 -390 -66 -22 -496 -186
-656 -250 -113 -46 -206 -82 -207 -81 -2 2 15 45 38 97 220 507 416 1126 529
1678 16 79 30 144 32 146 2 1 80 67 174 147 604 512 1073 868 1308 994 44 24
82 42 83 40 1 -1 -16 -81 -38 -177z m-10758 -101 c345 -228 1241 -937 1254
-991 3 -12 19 -83 35 -157 118 -528 313 -1114 539 -1617 27 -62 48 -113 46
-113 -3 0 -94 34 -202 76 -221 84 -637 234 -652 234 -23 0 -277 337 -433 575
-336 512 -610 1092 -782 1660 -38 128 -136 500 -136 520 0 14 192 -95 331
-187z m11494 -1900 c-177 -1230 -857 -2223 -1873 -2732 -842 -422 -1874 -522
-3042 -295 -141 28 -345 74 -443 100 l-38 10 121 127 c138 143 285 322 380
463 63 94 69 99 210 195 634 433 1494 849 2645 1281 267 100 482 175 1026 358
480 161 566 195 670 266 75 51 229 197 302 286 28 35 52 61 55 59 2 -3 -4 -55
-13 -118z m-12191 -290 c131 -99 253 -148 741 -298 1595 -491 2874 -1038 3669
-1568 147 -99 161 -111 208 -180 89 -132 250 -324 386 -461 73 -73 131 -135
130 -137 -2 -2 -100 -28 -218 -58 -342 -88 -599 -135 -930 -173 -224 -25 -882
-25 -1090 0 -663 81 -1198 267 -1670 580 -586 390 -1019 934 -1293 1627 -115
291 -197 604 -242 925 l-7 49 117 -122 c64 -67 154 -150 199 -184z m9980
-2992 c265 -175 629 -463 604 -477 -18 -9 -243 -56 -363 -75 -292 -46 -710
-57 -1016 -28 -499 47 -999 179 -1501 395 -193 83 -412 188 -406 194 3 3 72
-5 154 -19 157 -26 316 -47 524 -68 198 -20 838 -17 1020 5 229 28 430 65 630
117 102 26 191 48 199 49 7 0 77 -41 155 -93z m-7747 4 c374 -97 728 -140
1157 -140 363 0 645 25 1026 91 96 17 191 32 210 35 23 3 -34 -30 -170 -98
-620 -310 -1218 -485 -1850 -539 -194 -17 -643 -6 -835 20 -139 19 -405 67
-413 75 -9 10 226 211 395 339 118 89 344 246 356 247 4 0 60 -14 124 -30z"
              />
            </g>
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-black">
            Lucid: <span className="text-darkGray">Simplifying Complexity</span>
            .
          </h1>
          <p className="text-sm font-medium">
            Accelerate your mastery of math and physics with our expert-designed
            videos and interactive tools.
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

  const defaultVideo = "https://www.youtube.com/watch?v=r6sGWTCMz2k";

  const playVideo = (videoUrl = "") => {
    setCurrentVideo(videoUrl || defaultVideo);
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
            <div
              className="cursor-pointer hover:text-blue-600"
              onClick={() => playVideo()}
              aria-label="Play video about limits approaching infinity"
            >
              Neural Networks
            </div>
            <div
              className="cursor-pointer hover:text-blue-600"
              onClick={() => playVideo()}
              aria-label="Play video about derivatives"
            >
              Queens Gambit
            </div>
            <div
              className="cursor-pointer hover:text-blue-600"
              onClick={() => playVideo()}
              aria-label="Play video about integrals"
            >
              Balancing a Chemical Equation
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="aspect-w-16 aspect-h-9 rounded-lg border border-white bg-white p-4 shadow-lg sm:max-h-[90vh] sm:max-w-[90vw]">
          <div
            className="relative h-0 w-full"
            style={{ paddingBottom: "56.25%" }}
          >
            <iframe
              className="absolute left-0 top-0 h-full w-full"
              src={`https://www.youtube.com/embed/${currentVideo.split("v=")[1]}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
