import { z } from "zod";

const guestCountSchema = z.enum(["1", "2", "3", "4"], {
  required_error: "Укажите количество гостей",
});

export const rsvpSchema = z
  .object({
    attendance: z.enum(["yes", "no"], {
      required_error: "Выберите, сможете ли вы присутствовать",
    }),
    name: z
      .string()
      .trim()
      .min(2, "Введите имя")
      .max(80, "Имя слишком длинное"),
    guests: z.preprocess(
      (value) => (value === "" || value === null ? undefined : value),
      guestCountSchema.optional(),
    ),
    comment: z
      .string()
      .trim()
      .max(500, "Комментарий слишком длинный")
      .optional()
      .or(z.literal("")),
    website: z.string().max(0, "Недопустимое поле").optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (data.attendance === "yes" && !data.guests) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["guests"],
        message: "Укажите количество гостей",
      });
    }
  });

export type RsvpFormValues = z.infer<typeof rsvpSchema>;

/** Тело запроса с формы (до записи в таблицу). */
export function buildRsvpRequestBody(values: RsvpFormValues) {
  return {
    attendance: values.attendance,
    name: values.name.trim(),
    guests: values.attendance === "yes" ? values.guests : undefined,
    comment: values.comment?.trim() ?? "",
    website: values.website ?? "",
  };
}

/** Данные для Google Таблицы. */
export function normalizeRsvpPayload(values: RsvpFormValues) {
  return {
    attendance: values.attendance,
    name: values.name.trim(),
    guests: values.attendance === "yes" ? (values.guests ?? "1") : "0",
    comment: values.comment?.trim() ?? "",
    website: values.website ?? "",
  };
}
