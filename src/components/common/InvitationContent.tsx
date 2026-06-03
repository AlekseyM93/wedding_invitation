"use client";

import { useEffect, useRef } from "react";
import { useInvitationFlow } from "@/contexts/InvitationFlowContext";
import { InvitationSection } from "@/sections/InvitationSection";
import { StorySection } from "@/sections/StorySection";
import { ProgramSection } from "@/sections/ProgramSection";
import { LocationSection } from "@/sections/LocationSection";
import { DressCodeSection } from "@/sections/DressCodeSection";
import { FaqSection } from "@/sections/FaqSection";
import { RsvpSection } from "@/sections/RsvpSection";
import { ThankYouSection } from "@/sections/ThankYouSection";

export function InvitationContent() {
  const { isRsvpCompleted } = useInvitationFlow();
  const scrolledToFinalRef = useRef(false);

  useEffect(() => {
    if (!isRsvpCompleted || scrolledToFinalRef.current) {
      return;
    }

    scrolledToFinalRef.current = true;

    const timer = window.setTimeout(() => {
      const target = document.getElementById("thank-you");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 400);

    return () => window.clearTimeout(timer);
  }, [isRsvpCompleted]);

  return (
    <>
      <InvitationSection />
      <StorySection />
      <ProgramSection />
      <LocationSection />
      <DressCodeSection />
      <FaqSection />
      <RsvpSection />
      {isRsvpCompleted ? <ThankYouSection /> : null}
    </>
  );
}
