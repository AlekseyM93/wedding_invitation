import { z } from "zod";
import type { ZodErrorMap } from "zod";

const ruErrorMap: ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      if (issue.received === "undefined") {
        return { message: "Обязательное поле" };
      }
      return { message: "Некорректное значение" };
    case z.ZodIssueCode.too_small:
      if (issue.type === "string") {
        return { message: `Минимум ${issue.minimum} символов` };
      }
      return { message: "Слишком короткое значение" };
    case z.ZodIssueCode.too_big:
      if (issue.type === "string") {
        return { message: `Максимум ${issue.maximum} символов` };
      }
      return { message: "Слишком длинное значение" };
    case z.ZodIssueCode.invalid_enum_value:
      return { message: "Выберите значение из списка" };
    default:
      return { message: ctx.defaultError };
  }
};

z.setErrorMap(ruErrorMap);
