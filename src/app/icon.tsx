import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F7F3EF",
          color: "#6B4F3A",
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: "-0.05em",
        }}
      >
        В
      </div>
    ),
    { ...size },
  );
}
