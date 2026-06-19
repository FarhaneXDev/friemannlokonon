import { ImageResponse } from "next/og";

export const alt = "Friemann LOKONON — Développeur Web Fullstack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#08080A",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(74,222,128,0.15) 0%, rgba(74,222,128,0.04) 45%, transparent 70%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 18px",
            borderRadius: "100px",
            border: "1px solid rgba(74,222,128,0.3)",
            backgroundColor: "rgba(74,222,128,0.08)",
            color: "#86efac",
            fontSize: "20px",
            fontWeight: 500,
            marginBottom: "40px",
            width: "fit-content",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#4ade80",
            }}
          />
          Disponible pour missions freelance
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: 600,
              color: "#F4F4F5",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Friemann LOKONON
          </div>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 500,
              color: "#86efac",
              letterSpacing: "-0.01em",
            }}
          >
            Développeur Web Fullstack
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          {["Next.js", "Django", "PostgreSQL"].map((tech) => (
            <div
              key={tech}
              style={{
                padding: "10px 22px",
                borderRadius: "100px",
                border: "1px solid rgba(255,255,255,0.1)",
                backgroundColor: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.6)",
                fontSize: "20px",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
