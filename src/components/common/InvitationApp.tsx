"use client";

import { InvitationContent } from "@/components/common/InvitationContent";
import { useInvitationFlow } from "@/contexts/InvitationFlowContext";
import { HeroSection } from "@/sections/HeroSection";

export function InvitationApp() {
  const { isInvitationOpen } = useInvitationFlow();

  if (!isInvitationOpen) {
    return (
      <main>
        <HeroSection />
      </main>
    );
  }

  return (
    <main className="overflow-x-clip">
      <InvitationContent />
    </main>
  );
}
