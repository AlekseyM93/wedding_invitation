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
import { scrollToThankYouSection } from "@/lib/scroll-to-thank-you";

export function InvitationContent() {
  const { isRsvpCompleted } = useInvitationFlow();
  const scrolledToFinalRef = useRef(false);

  useEffect(() => {
    if (!isRsvpCompleted || scrolledToFinalRef.current) {
      return;
    }

    scrolledToFinalRef.current = true;

    scrollToThankYouSection(400);
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
