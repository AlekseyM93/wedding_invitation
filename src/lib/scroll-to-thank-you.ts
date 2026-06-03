/** Плавный переход к финальному экрану после RSVP (и «да», и «нет»). */
export function scrollToThankYouSection(delayMs = 320) {
  if (typeof window === "undefined") {
    return;
  }

  window.requestAnimationFrame(() => {
    window.setTimeout(() => {
      document.getElementById("thank-you")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, delayMs);
  });
}
