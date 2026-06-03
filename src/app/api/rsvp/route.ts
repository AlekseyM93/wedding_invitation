import { NextResponse } from "next/server";
import "@/lib/zod-ru";
import { appendRsvpToSheet } from "@/lib/google-sheets";
import { getClientIp, isRateLimited } from "@/lib/rsvp-rate-limit";
import { getSiteUrl } from "@/lib/site";
import { normalizeRsvpPayload, rsvpSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { success: false, code: "rate_limited" },
        { status: 429 },
      );
    }

    const body = await request.json();
    const parsed = rsvpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const normalized = normalizeRsvpPayload(parsed.data);

    if (normalized.website) {
      return NextResponse.json({ success: true });
    }

    const result = await appendRsvpToSheet({
      name: normalized.name,
      attendance: normalized.attendance,
      guests: normalized.guests,
      comment: normalized.comment,
      source: getSiteUrl(),
    });

    if (!result.ok) {
      const status =
        result.reason === "not_configured"
          ? 503
          : result.reason === "timeout"
            ? 504
            : 502;

      return NextResponse.json(
        {
          success: false,
          code: result.reason,
        },
        { status },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
