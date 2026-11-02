import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 24,
        padding: 96,
        background: "#ffffff",
        color: "#111111",
      }}
    >
      <svg
        width="96"
        height="96"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#111111"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15 15 0 0 0 0 20a15 15 0 0 0 0-20M2.5 9h19M2.5 15h19" />
      </svg>
      <div style={{ fontSize: 88, fontWeight: 700 }}>{site.name}</div>
      <div style={{ fontSize: 36, color: "#555555" }}>{site.description}</div>
      <div style={{ fontSize: 28, color: "#555555" }}>
        {`npx shadcn@latest init ${site.url}/r/base.json`}
      </div>
    </div>,
    size,
  );
}
