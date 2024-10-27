"use client";
import { AnimatePresence } from "framer-motion";

export default function BalancerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AnimatePresence>{children}</AnimatePresence>;
}
