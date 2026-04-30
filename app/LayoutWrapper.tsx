"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/HomePage/HeaderComponent";
import Footer from "@/components/FooterSection";

interface Props {
  children: ReactNode;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export default function LayoutWrapper({ children, user }: Props) {
  const pathname = usePathname();

  return (
    <>
      <Header user={user} />

      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{
            opacity: 0,
            y: 8,
            scale: 0.995,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -8,
            scale: 0.995,
          }}
          transition={{
            duration: 0.35,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{ minHeight: "100vh" }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />
    </>
  );
}
