"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "wedding-invitation-flow-v1";

export type InvitationFlowStage = "locked" | "opened" | "completed";
export type InvitationView = "cover" | "content";

type InvitationFlowContextValue = {
  stage: InvitationFlowStage;
  view: InvitationView;
  openInvitation: () => void;
  returnToCover: () => void;
  completeRsvp: () => void;
  isContentUnlocked: boolean;
  isInvitationOpen: boolean;
  isRsvpCompleted: boolean;
};

const InvitationFlowContext = createContext<InvitationFlowContextValue | null>(
  null,
);

function readStoredStage(): InvitationFlowStage {
  if (typeof window === "undefined") {
    return "locked";
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "opened" || raw === "completed") {
      return raw;
    }
  } catch {
    /* ignore */
  }

  return "locked";
}

function writeStoredStage(stage: InvitationFlowStage) {
  try {
    if (stage === "locked") {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, stage);
  } catch {
    /* ignore */
  }
}

export function InvitationFlowProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<InvitationFlowStage>("locked");
  const [view, setView] = useState<InvitationView>("cover");

  useEffect(() => {
    const stored = readStoredStage();
    setStage(stored);
    // Всегда начинаем с обложки; «opened» в localStorage не пропускает первый экран.
  }, []);

  const openInvitation = useCallback(() => {
    setStage("opened");
    writeStoredStage("opened");
    setView("content");
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const returnToCover = useCallback(() => {
    setView("cover");
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const completeRsvp = useCallback(() => {
    setStage("completed");
    writeStoredStage("completed");
  }, []);

  const value = useMemo(
    () => ({
      stage,
      view,
      openInvitation,
      returnToCover,
      completeRsvp,
      isContentUnlocked: stage === "opened" || stage === "completed",
      isInvitationOpen: view === "content",
      isRsvpCompleted: stage === "completed",
    }),
    [stage, view, openInvitation, returnToCover, completeRsvp],
  );

  return (
    <InvitationFlowContext.Provider value={value}>
      {children}
    </InvitationFlowContext.Provider>
  );
}

export function useInvitationFlow() {
  const context = useContext(InvitationFlowContext);

  if (!context) {
    throw new Error("useInvitationFlow must be used within InvitationFlowProvider");
  }

  return context;
}
