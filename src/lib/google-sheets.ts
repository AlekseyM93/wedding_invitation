export type RsvpSheetPayload = {
  name: string;
  attendance: "yes" | "no";
  guests: string;
  comment?: string;
  source?: string;
};

type AppendResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "request_failed" | "timeout" };

const WEBHOOK_TIMEOUT_MS = 12_000;

export async function appendRsvpToSheet(
  payload: RsvpSheetPayload,
): Promise<AppendResult> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  const secret = process.env.GOOGLE_SHEETS_SECRET?.trim();

  if (!webhookUrl || !secret) {
    return { ok: false, reason: "not_configured" };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret,
        name: payload.name,
        attendance: payload.attendance,
        guests: payload.guests,
        comment: payload.comment ?? "",
        source: payload.source ?? "Свадебное приглашение",
      }),
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      return { ok: false, reason: "request_failed" };
    }

    const data = (await response.json()) as { success?: boolean };

    if (!data.success) {
      return { ok: false, reason: "request_failed" };
    }

    return { ok: true };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return { ok: false, reason: "timeout" };
    }

    return { ok: false, reason: "request_failed" };
  } finally {
    clearTimeout(timeoutId);
  }
}
