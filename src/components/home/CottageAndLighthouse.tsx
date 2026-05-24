"use client";

export const CottageAndLighthouse: React.FC = () => {
  return (
    <div className="absolute right-0 bottom-[8%] pointer-events-none">
      {/* 图片放大 1.15 倍并以右下为锚点，让左侧延伸更远，避免左移时暴露边界 */}
      <img
        src="/home.png"
        alt="Cottage and Lighthouse"
        width={900}
        height={900}
        className="object-contain"
        style={{
          imageRendering: "auto",
          transform: "scale(1.15)",
          transformOrigin: "right bottom",
        }}
      />
    </div>
  );
};
