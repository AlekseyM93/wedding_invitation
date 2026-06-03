"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useInvitationFlow } from "@/contexts/InvitationFlowContext";
import { ui } from "@/data/ui";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#invitation", label: ui.nav.invitation },
  { href: "#story", label: ui.nav.story },
  { href: "#program", label: ui.nav.program },
  { href: "#location", label: ui.nav.location },
  { href: "#dress-code", label: ui.nav.dressCode },
  { href: "#faq", label: ui.nav.faq },
  { href: "#rsvp", label: ui.nav.rsvp },
] as const;

export function Header() {
  const { isInvitationOpen, isRsvpCompleted, openInvitation, returnToCover } =
    useInvitationFlow();

  const items = [
    ...navItems,
    ...(isRsvpCompleted
      ? [{ href: "#thank-you" as const, label: ui.nav.thankYou }]
      : []),
  ];

  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const menuWasOpenRef = useRef(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 80);
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    menuPanelRef.current?.focus();

    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  useEffect(() => {
    if (menuWasOpenRef.current && !menuOpen) {
      menuButtonRef.current?.focus();
    }
    menuWasOpenRef.current = menuOpen;
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const showSolidHeader = scrolled || isInvitationOpen;

  const navigateToSection = useCallback(
    (href: string) => {
      closeMenu();

      if (!isInvitationOpen) {
        openInvitation();
      }

      window.requestAnimationFrame(() => {
        window.setTimeout(() => {
          const target = document.querySelector(href);
          target?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, isInvitationOpen ? 0 : 120);
      });
    },
    [isInvitationOpen, openInvitation],
  );

  const handleLogoClick = () => {
    closeMenu();
    if (isInvitationOpen) {
      returnToCover();
    }
  };

  const showDesktopNav = isInvitationOpen;
  const showBurger = !isInvitationOpen;

  return (
    <>
      <motion.header
        className={cn(
          "safe-top fixed left-0 top-0 z-50 w-full px-4 py-4 transition-[box-shadow] duration-300 sm:px-6 md:px-10",
          showSolidHeader && "shadow-[0_8px_32px_rgba(78,57,43,0.08)]",
        )}
        animate={{
          backgroundColor: showSolidHeader
            ? "rgba(247, 243, 239, 0.94)"
            : "rgba(247, 243, 239, 0)",
          backdropFilter: showSolidHeader ? "blur(16px)" : "blur(0px)",
        }}
        transition={{ duration: 0.25 }}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3">
          {isInvitationOpen ? (
            <button
              type="button"
              aria-label={ui.nav.home}
              onClick={handleLogoClick}
              className="group flex min-w-0 shrink-0 flex-col leading-none text-left"
            >
              <LogoText showSolidHeader={showSolidHeader} />
            </button>
          ) : (
            <div className="group flex min-w-0 shrink-0 flex-col leading-none">
              <LogoText showSolidHeader={showSolidHeader} />
            </div>
          )}

          {showDesktopNav ? (
            <nav
              className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1"
              aria-label={ui.nav.label}
            >
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-2 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-wedding-ink/72 transition-colors hover:bg-wedding-beige/60 hover:text-wedding-ink xl:px-3 xl:text-[10px] xl:tracking-[0.2em] 2xl:px-4 2xl:text-[11px]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : (
            <span className="hidden flex-1 lg:block" aria-hidden="true" />
          )}

          {showBurger ? (
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={menuOpen ? ui.nav.closeMenu : ui.nav.openMenu}
              aria-expanded={menuOpen}
              aria-controls="site-mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border backdrop-blur-md transition",
                showSolidHeader
                  ? "border-wedding-line bg-wedding-pearl text-wedding-ink hover:bg-white"
                  : "border-white/35 bg-white/10 text-white hover:bg-white/20",
              )}
            >
              {menuOpen ? (
                <X size={20} strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
              )}
            </button>
          ) : (
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={menuOpen ? ui.nav.closeMenu : ui.nav.openMenu}
              aria-expanded={menuOpen}
              aria-controls="site-mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-wedding-line bg-wedding-pearl text-wedding-ink backdrop-blur-md transition hover:bg-white lg:hidden"
            >
              {menuOpen ? (
                <X size={20} strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </motion.header>

      {menuOpen ? (
        <div
          className="fixed inset-0 z-[60]"
          role="presentation"
        >
          <button
            type="button"
            aria-label={ui.nav.closeMenu}
            className="absolute inset-0 bg-wedding-ink/45 backdrop-blur-sm"
            onClick={closeMenu}
          />

          <nav
            id="site-mobile-menu"
            ref={menuPanelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={ui.nav.label}
            className={cn(
              "safe-top safe-bottom absolute right-0 top-0 flex h-full w-[min(100%,320px)] flex-col bg-wedding-pearl px-6 py-24 shadow-luxury outline-none",
              isInvitationOpen && "lg:hidden",
            )}
          >
            <p className="mb-6 text-[10px] uppercase tracking-[0.28em] text-wedding-gold">
              {ui.nav.label}
            </p>

            {!isInvitationOpen ? (
              <button
                type="button"
                onClick={() => {
                  openInvitation();
                  closeMenu();
                }}
                className="mb-4 rounded-full border border-wedding-line bg-wedding-cream px-5 py-3.5 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-wedding-ink"
              >
                {ui.hero.openInvitation}
              </button>
            ) : null}

            <ul className="flex flex-col gap-1 overflow-y-auto">
              {items.map((item) => (
                <li key={item.href}>
                  <button
                    type="button"
                    onClick={() => navigateToSection(item.href)}
                    className="block w-full rounded-2xl px-4 py-3.5 text-left text-[13px] font-semibold uppercase tracking-[0.22em] text-wedding-ink transition hover:bg-wedding-cream"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {isInvitationOpen ? (
              <button
                type="button"
                onClick={() => {
                  returnToCover();
                  closeMenu();
                }}
                className="mt-auto rounded-full border border-wedding-line bg-wedding-cream px-5 py-3.5 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-wedding-ink"
              >
                {ui.nav.home}
              </button>
            ) : null}
          </nav>
        </div>
      ) : null}
    </>
  );
}

function LogoText({ showSolidHeader }: { showSolidHeader: boolean }) {
  return (
    <>
      <span
        className={cn(
          "wedding-serif text-[28px] font-medium tracking-[-0.08em] transition-colors sm:text-[34px] md:text-[40px]",
          showSolidHeader
            ? "text-wedding-ink group-hover:text-wedding-brown"
            : "text-white drop-shadow-[0_2px_12px_rgba(0,0,0,.25)] group-hover:opacity-80",
        )}
      >
        {ui.brand.logoMain}
      </span>
      <span
        className={cn(
          "-mt-1 text-[8px] uppercase tracking-[0.28em] transition-colors sm:text-[9px] sm:tracking-[0.32em]",
          showSolidHeader
            ? "text-wedding-brown/70"
            : "text-white/80 drop-shadow-[0_2px_10px_rgba(0,0,0,.25)]",
        )}
      >
        {ui.brand.logoSub}
      </span>
    </>
  );
}
