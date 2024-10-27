"use client";
import { Provider } from "react-wrap-balancer";

export default function BalancerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider>{children}</Provider>;
}
