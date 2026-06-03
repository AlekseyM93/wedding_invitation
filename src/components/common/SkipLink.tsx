"use client";

import { useInvitationFlow } from "@/contexts/InvitationFlowContext";
import { ui } from "@/data/ui";

export function SkipLink() {
  const { isInvitationOpen, openInvitation } = useInvitationFlow();

  return (
    <a
      href="#invitation"
      className="skip-link"
      onClick={(event) => {
        if (isInvitationOpen) {
          return;
        }

        event.preventDefault();
        openInvitation();

        window.requestAnimationFrame(() => {
          document.getElementById("invitation")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });
      }}
    >
      {ui.skipLink}
    </a>
  );
}
