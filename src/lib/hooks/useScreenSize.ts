"use client";

import { useState, useEffect } from "react";

export type Breakpoint = "sm" | "md" | "lg";

export interface ScreenSize {
  width: number;
  height: number;
  breakpoint: Breakpoint;
}

export function useScreenSize(): ScreenSize {
  const [size, setSize] = useState<ScreenSize>({
    width: 0,
    height: 0,
    breakpoint: "md",
  });

  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      let bp: Breakpoint = "lg";
      if (w < 640) bp = "sm";
      else if (w < 1024) bp = "md";
      setSize({ width: w, height: h, breakpoint: bp });
    }

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}
