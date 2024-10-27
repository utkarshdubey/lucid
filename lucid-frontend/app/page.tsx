"use client";
import FirstCard from "@/components/cards/first-card";
import SecondCard from "@/components/cards/second-card";
import ThirdCard from "@/components/cards/third-card";

import { AnimatePresence } from "framer-motion";

import { Spotlight } from "@/components/ui/Spotlight";
import { Meteors } from "@/components/ui/Meteor";
import { motion } from "framer-motion";

import { stagger, fadeInUp } from "@/lib/animations";

export default function Home() {
  return (
    <AnimatePresence>
      <div className="main relative">
        <Meteors number={10} className="hidden md:block" />
        <main className="relative min-h-screen md:flex md:w-full md:items-center md:justify-center">
          <Spotlight
            className="absolute -top-40 left-0 -z-10 md:-top-20 md:left-60"
            fill="#000"
          />
          <div className="hidden md:fixed md:flex md:w-screen md:-rotate-[70deg] md:scale-[1.7] md:items-center md:justify-center md:gap-32">
            <Shadow />
            <Shadow />
            <Shadow />
            <Shadow />
            <Shadow />
          </div>
          <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
            <motion.div
              className="z-20 flex min-h-screen flex-col items-center justify-between gap-y-2 border border-stroke bg-bgGray p-2 md:min-h-min md:w-[450px] md:scale-90 md:justify-normal md:rounded-3xl"
              variants={stagger}
            >
              {/* First Card */}
              <motion.div
                className="relative w-full flex-[1_0_auto] overflow-hidden rounded-lg border border-stroke bg-white md:flex-none"
                // style={{ flex: "1 0 auto" }}
                variants={fadeInUp}
              >
                <FirstCard />
              </motion.div>

              {/* Second Card */}
              <motion.div
                className="relative w-full flex-[1_0_auto] overflow-hidden rounded-lg border border-stroke bg-white md:flex-none"
                // style={{ flex: "1 0 auto" }}
                variants={fadeInUp}
              >
                <SecondCard />
              </motion.div>
              {/* Third Card */}
              <motion.a
                className="relative w-full overflow-hidden rounded-lg border border-stroke bg-white"
                variants={fadeInUp}
                id="fancy"
                href="https://devpost.com/software/hackru-24-fall-project"
                target="_blank"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
              >
                <ThirdCard />
              </motion.a>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </AnimatePresence>
  );
}

function Shadow() {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #E6E6E6 0%, #999999 100%)",
        opacity: 0.2,
        filter: "blur(20px)",
        minHeight: "100vh",
        width: "100px",
      }}
    ></div>
  );
}
