"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ContactForm from "./ContactForm";

// Homepage CTA. Expands in place into a short brief rather than linking to
// /contact — the homepage is the reel, and sending someone away mid-scroll
// costs the momentum the feed just built.
export default function StartProject() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // AnimatePresence mode="wait" unmounts one child before mounting the other,
  // so focus has to be moved when the node actually appears, not when `open`
  // flips — otherwise it lands on <body>.
  const refocusButton = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        refocusButton.current = true;
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div>
      <AnimatePresence initial={false} mode="wait">
        {!open ? (
          <motion.div
            key="button"
            initial={false}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <button
              ref={(node) => {
                buttonRef.current = node;
                if (node && refocusButton.current) {
                  refocusButton.current = false;
                  node.focus();
                }
              }}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={false}
              aria-controls={panelId}
              className="font-mono uppercase text-paper bg-ink hover:bg-accent transition-colors duration-[250ms] cursor-pointer border-0 px-7 py-[15px]"
              style={{ fontSize: 12, letterSpacing: "0.14em" }}
            >
              Start a project
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="panel"
            id={panelId}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            // Clipped only while the height is in motion; once settled the
            // panel must not crop focus rings on the fields.
            style={{ overflow: "hidden" }}
            onAnimationComplete={() => {
              if (!open || !panelRef.current) return;
              panelRef.current.style.overflow = "visible";
              panelRef.current
                .querySelector<HTMLInputElement>("input[name='name']")
                ?.focus();
            }}
            ref={panelRef}
          >
            <div className="max-w-[520px] border-t border-line pt-6">
              <div className="flex items-baseline justify-between mb-5">
                <p
                  className="font-mono uppercase text-accent"
                  style={{ fontSize: 11, letterSpacing: "0.18em" }}
                >
                  Start a project
                </p>
                <button
                  type="button"
                  onClick={() => {
                    refocusButton.current = true;
                    setOpen(false);
                  }}
                  className="font-mono uppercase text-faint hover:text-accent transition-colors duration-[250ms] bg-transparent border-0 p-0 cursor-pointer"
                  style={{ fontSize: 11, letterSpacing: "0.14em" }}
                >
                  Close
                </button>
              </div>

              <ContactForm variant="compact" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
