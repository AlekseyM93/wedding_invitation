"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ui } from "@/data/ui";
import { useInvitationFlow } from "@/contexts/InvitationFlowContext";

export function ScrollHint() {
  const { openInvitation } = useInvitationFlow();

  return (
    <button
      type="button"
      onClick={openInvitation}
      aria-label={ui.hero.openInvitation}
      className="safe-bottom absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-white/80 sm:bottom-8 sm:gap-3"
    >
      <span className="text-[9px] font-semibold uppercase tracking-[0.24em] sm:text-[10px] sm:tracking-[0.32em]">
        {ui.hero.openInvitation}
      </span>

      <motion.span
        animate={{ y: [0, 8, 0] }}
        transition={{
          repeat: Infinity,
          duration: 1.9,
          ease: "easeInOut",
        }}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-white/10 backdrop-blur-md"
      >
        <ChevronDown size={18} strokeWidth={1.5} aria-hidden="true" />
      </motion.span>
    </button>
  );
}
