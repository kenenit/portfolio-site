import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#080808",
          padding: "0 90px",
          position: "relative",
        }}
      >
        {/* faint corner accents, echoing the dashed-corner motif used
            throughout the real site's sections */}
        <div
          style={{
            position: "absolute",
            top: 50,
            left: 50,
            width: 56,
            height: 56,
            borderTop: "1px dashed rgba(232,183,200,0.4)",
            borderLeft: "1px dashed rgba(232,183,200,0.4)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 50,
            right: 50,
            width: 56,
            height: 56,
            borderBottom: "1px dashed rgba(232,183,200,0.4)",
            borderRight: "1px dashed rgba(232,183,200,0.4)",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontFamily: "monospace",
            letterSpacing: 4,
            color: "#e8b7c8",
            marginBottom: 28,
          }}
        >
          {"// PORTFOLIO"}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            color: "#f5f2f0",
            letterSpacing: -2,
            marginBottom: 24,
          }}
        >
          KENENI
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#9a9698",
          }}
        >
          Full-stack developer —{" "}
          <span style={{ color: "#e8b7c8", marginLeft: 10 }}>
            digital products that work.
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
