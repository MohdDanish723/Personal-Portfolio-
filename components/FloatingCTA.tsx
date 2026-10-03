"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { useContactModal } from "./ContactModal";

// Appears after the hero, hides again once the contact section is visible.
export default function FloatingCTA() {
  const [pastHero, setPastHero] = useState(false);
  const [atContact, setAtContact] = useState(false);
  const { open } = useContactModal();

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const contact = document.getElementById("contact");
    const io = new IntersectionObserver(([e]) => setAtContact(e.isIntersecting), {
      threshold: 0.25,
    });
    if (contact) io.observe(contact);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const show = pastHero && !atContact;

  return (
    <button
      type="button"
      onClick={open}
      tabIndex={show ? 0 : -1}
      className={`btn btn-primary fixed bottom-5 right-5 z-40 shadow-[0_12px_40px_-8px_var(--accent)] transition-all duration-300 sm:right-8 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <MessageCircle size={16} />
      Say hello
    </button>
  );
}
