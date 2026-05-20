import { ImageResponse } from "next/og";
export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "CANAAN";

  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(to bottom right, #000000, #111111)",
            color: "white",
            padding: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: "0.2em",
              marginBottom: 40,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 36,
              textAlign: "center",
            maxWidth: "80%",
            color: "#93c5fd",
            }}
          >
            Une communauté vibrante pour expérimenter la présence de Dieu.
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.log(`${e}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
