export default function GridBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.058) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.058) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 10%, transparent 100%)",
      }}
    />
  );
}
