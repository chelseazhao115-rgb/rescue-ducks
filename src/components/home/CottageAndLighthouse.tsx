"use client";

export const CottageAndLighthouse: React.FC = () => {
  return (
    <div className="absolute right-0 bottom-[8%] pointer-events-none">
      <img
        src="/home.png"
        alt="Cottage and Lighthouse"
        width={1120}
        height={1120}
        className="object-contain"
        style={{ imageRendering: "auto" }}
      />
    </div>
  );
};
