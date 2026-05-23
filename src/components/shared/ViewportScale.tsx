"use client";

import { useEffect } from "react";

const DESIGN_HEIGHT = 1440;
const MIN_SCALE = 0.6;

export function ViewportScale() {
  useEffect(() => {
    function update() {
      const scale = Math.max(MIN_SCALE, Math.min(1, window.innerHeight / DESIGN_HEIGHT));
      document.documentElement.style.setProperty("--vscale", String(scale));
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return null;
}
