"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { saveAudienceCode, type AudienceProfile } from "@/lib/audience";
import { playButtonClick } from "@/lib/utils/sound";

interface AccessCodeModalProps {
  onVerified: (profile: AudienceProfile) => void;
}

export const AccessCodeModal: React.FC<AccessCodeModalProps> = ({ onVerified }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    playButtonClick();
    const profile = saveAudienceCode(code);
    if (!profile) {
      setError("Please enter a valid access code.");
      return;
    }

    setError("");
    onVerified(profile);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center px-5"
      style={{
        background:
          "radial-gradient(ellipse at 50% 20%, rgba(255,217,122,0.18), transparent 42%), rgba(8, 10, 24, 0.72)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <motion.section
        role="dialog"
        aria-modal="true"
        aria-labelledby="access-code-title"
        className="w-full max-w-[420px] rounded-[24px] border border-white/[0.16] px-6 py-6 shadow-2xl"
        style={{
          background: "linear-gradient(180deg, rgba(42,48,82,0.82), rgba(22,26,50,0.9))",
          boxShadow: "0 0 54px rgba(255,217,122,0.14), 0 24px 80px rgba(4,6,18,0.45)",
        }}
        initial={{ opacity: 0, y: 14, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-[#ffe7b0]/70">
          Rescue Ducks
        </p>
        <h2 id="access-code-title" className="text-3xl font-extrabold leading-tight text-[#fff2cf]">
          Access Code
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/68">
          Enter your access code to continue.
        </p>

        <input
          value={code}
          onChange={(event) => {
            setCode(event.target.value);
            if (error) setError("");
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") submit();
          }}
          autoFocus
          spellCheck={false}
          className="mt-6 w-full rounded-full px-5 py-3 text-base font-semibold text-[#fff2cf] outline-none"
          style={{
            background: "rgba(255,255,255,0.1)",
            border: `1px solid ${error ? "rgba(255,160,160,0.46)" : "rgba(255,255,255,0.18)"}`,
          }}
          placeholder="Enter code"
        />

        {error && (
          <p className="mt-3 text-sm font-semibold text-[#ffc6c6]">
            {error}
          </p>
        )}

        <motion.button
          type="button"
          onClick={submit}
          className="mt-5 w-full rounded-full px-5 py-3 text-base font-extrabold tracking-wide"
          style={{
            background: "linear-gradient(180deg, #ffe8af, #f0c860)",
            color: "#5a4a28",
            border: "1px solid rgba(255,255,255,0.35)",
            boxShadow: "0 0 36px rgba(255,220,120,0.34), 0 6px 20px rgba(0,0,0,0.22)",
          }}
          whileHover={{ y: -1, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          Continue
        </motion.button>
      </motion.section>
    </motion.div>
  );
};
