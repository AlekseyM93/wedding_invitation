"use client";

import {
  forwardRef,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Frown, Heart } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ui } from "@/data/ui";
import {
  buildRsvpRequestBody,
  rsvpSchema,
  type RsvpFormValues,
} from "@/lib/validations";
import { useInvitationFlow } from "@/contexts/InvitationFlowContext";
import { scrollToThankYouSection } from "@/lib/scroll-to-thank-you";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils";

type AttendanceChoiceProps = {
  value: "yes" | "no";
  selected: boolean;
  tabIndex: number;
  onSelect: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  icon: ReactNode;
  title: string;
  description: string;
};

const AttendanceChoice = forwardRef<HTMLButtonElement, AttendanceChoiceProps>(
  function AttendanceChoice(
    {
      value,
      selected,
      tabIndex,
      onSelect,
      onKeyDown,
      icon,
      title,
      description,
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={selected}
        tabIndex={tabIndex}
        onClick={onSelect}
        onKeyDown={onKeyDown}
        className={cn(
          "rsvp-choice-card",
          selected && "rsvp-choice-card--active",
        )}
      >
      <span className="rsvp-choice-radio" aria-hidden="true" />
      <span className="rsvp-choice-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="rsvp-choice-title">{title}</span>
      <span className="rsvp-choice-text">{description}</span>
      <span className="sr-only">
        {value === "yes" ? ui.rsvp.attendingYes : ui.rsvp.attendingNo}
      </span>
    </button>
    );
  },
);

export function RsvpForm() {
  const { completeRsvp, isRsvpCompleted } = useInvitationFlow();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const yesRef = useRef<HTMLButtonElement>(null);
  const noRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      attendance: undefined,
      name: "",
      guests: undefined,
      comment: "",
      website: "",
    },
  });

  const attendance = watch("attendance");

  const selectAttendance = (value: "yes" | "no") => {
    setValue("attendance", value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    if (value === "no") {
      setValue("guests", undefined, { shouldValidate: true });
    }
  };

  const handleRadioKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    current: "yes" | "no",
  ) => {
    if (
      event.key === "ArrowRight" ||
      event.key === "ArrowDown" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowUp"
    ) {
      event.preventDefault();
      const next = current === "yes" ? "no" : "yes";
      selectAttendance(next);
      (next === "yes" ? yesRef : noRef).current?.focus();
      return;
    }

    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      selectAttendance(current);
    }
  };

  const onSubmit = async (values: RsvpFormValues) => {
    setSubmitError(null);
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildRsvpRequestBody(values)),
      });

      const data = (await response.json()) as {
        success?: boolean;
        code?: string;
      };

      if (!response.ok || !data.success) {
        if (data.code === "not_configured") {
          setSubmitError(ui.rsvp.errorNotConfigured);
        } else if (data.code === "rate_limited") {
          setSubmitError(ui.rsvp.errorRateLimited);
        } else {
          setSubmitError(ui.rsvp.errorGeneric);
        }
        return;
      }

      completeRsvp(values.attendance);
      scrollToThankYouSection();
    } catch {
      setSubmitError(ui.rsvp.errorGeneric);
    }
  };

  if (isRsvpCompleted) {
    return (
      <div className="rsvp-success-panel" role="status" aria-live="polite">
        <p className="rsvp-success-title">{ui.rsvp.successTitle}</p>
        <p className="rsvp-success-text">{ui.rsvp.successText}</p>
      </div>
    );
  }

  const yesSelected = attendance === "yes";
  const noSelected = attendance === "no";
  const yesTabIndex = yesSelected || !attendance ? 0 : -1;
  const noTabIndex = noSelected || !attendance ? 0 : -1;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Сайт</label>
        <input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div
        className="rsvp-choice-grid"
        role="radiogroup"
        aria-label={ui.sections.rsvp.title}
      >
        <AttendanceChoice
          ref={yesRef}
          value="yes"
          selected={yesSelected}
          tabIndex={yesTabIndex}
          onSelect={() => selectAttendance("yes")}
          onKeyDown={(event) => handleRadioKeyDown(event, "yes")}
          icon={<Heart size={28} strokeWidth={1.35} />}
          title={ui.rsvp.attendingYesTitle}
          description={ui.rsvp.attendingYesText}
        />

        <AttendanceChoice
          ref={noRef}
          value="no"
          selected={noSelected}
          tabIndex={noTabIndex}
          onSelect={() => selectAttendance("no")}
          onKeyDown={(event) => handleRadioKeyDown(event, "no")}
          icon={<Frown size={28} strokeWidth={1.35} />}
          title={ui.rsvp.attendingNoTitle}
          description={ui.rsvp.attendingNoText}
        />
      </div>

      <input type="hidden" {...register("attendance")} />

      {errors.attendance ? (
        <p className="mt-3 text-center text-sm text-red-600" role="alert">
          {errors.attendance.message}
        </p>
      ) : null}

      <div className="rsvp-form-panel">
        <div className="grid gap-5">
          <Input
            id="rsvp-name"
            label={ui.rsvp.nameLabel}
            placeholder={ui.rsvp.namePlaceholder}
            error={errors.name?.message}
            autoComplete="name"
            {...register("name")}
          />

          {attendance === "yes" ? (
            <Select
              id="rsvp-guests"
              label={ui.rsvp.guestsLabel}
              error={errors.guests?.message}
              {...register("guests")}
            >
              <option value="" disabled>
                {ui.rsvp.guestsPlaceholder}
              </option>
              <option value="1">{ui.rsvp.guest1}</option>
              <option value="2">{ui.rsvp.guest2}</option>
              <option value="3">{ui.rsvp.guest3}</option>
              <option value="4">{ui.rsvp.guest4}</option>
            </Select>
          ) : null}

          <Textarea
            id="rsvp-comment"
            label={ui.rsvp.commentLabel}
            placeholder={ui.rsvp.commentPlaceholder}
            error={errors.comment?.message}
            {...register("comment")}
          />
        </div>

        {submitError ? (
          <p className="mt-4 text-sm text-red-600" role="alert">
            {submitError}
          </p>
        ) : null}

        <Button
          type="submit"
          fullWidth
          disabled={isSubmitting}
          className="mt-6 h-14 rounded-[18px] sm:h-[72px] sm:rounded-[22px]"
        >
          {isSubmitting ? ui.rsvp.submitting : ui.rsvp.submit}
        </Button>

        <p className="rsvp-privacy">{ui.rsvp.privacy}</p>
      </div>
    </form>
  );
}
