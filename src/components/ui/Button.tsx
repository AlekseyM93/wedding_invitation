import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type SharedProps = {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
};

type ButtonAsButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps>;

type ButtonAsAnchorProps = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-wedding-brown text-white hover:bg-wedding-ink focus-visible:ring-wedding-brown",
  secondary:
    "bg-wedding-pearl text-wedding-ink border border-wedding-line hover:bg-white focus-visible:ring-wedding-gold",
  ghost:
    "bg-transparent text-wedding-ink hover:bg-wedding-pearl focus-visible:ring-wedding-gold",
};

function getClasses(
  variant: ButtonVariant,
  fullWidth: boolean,
  className?: string,
) {
  return cn(
    "inline-flex h-12 items-center justify-center rounded-full px-6 text-[10px] font-semibold uppercase tracking-[0.22em] transition-all duration-300 sm:h-14 sm:px-8 sm:text-[12px] sm:tracking-[0.28em]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    fullWidth && "w-full",
    className,
  );
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    fullWidth = false,
    className,
    children,
    ...rest
  } = props;

  const classes = getClasses(variant, fullWidth, className);

  if ("href" in props && typeof props.href === "string") {
    const anchorProps = rest as Omit<ButtonAsAnchorProps, keyof SharedProps>;
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = rest as Omit<ButtonAsButtonProps, keyof SharedProps>;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
