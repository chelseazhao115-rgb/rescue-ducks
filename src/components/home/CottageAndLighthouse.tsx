"use client";

export const CottageAndLighthouse: React.FC = () => {
  return (
    <div className="absolute right-0 bottom-[8%] pointer-events-none">
      <img
        src="/home.png"
        alt="Cottage and Lighthouse"
        width={900}
        height={900}
        className="object-contain"
        style={{ imageRendering: "auto" }}
      />
    </div>
  );
};
