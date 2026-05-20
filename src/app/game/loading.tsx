export default function GameLoading() {
  return (
    <div className="w-full h-dvh bg-storm-dark flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-lighthouse-glow/30 border-t-lighthouse-glow animate-spin" />
        <p className="text-white/30 text-sm">Loading...</p>
      </div>
    </div>
  );
}
