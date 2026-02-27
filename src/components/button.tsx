import type React from "react";

type ButtonBaseProps = {
  label?: string;
  classNames: string;
  isDisabled?: boolean;
  withText?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};

type ButtonProps<T extends "button" | "a"> = ButtonBaseProps & {
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonBaseProps | "as">;

export default function Button<T extends "button" | "a" = "button">({
  as,
  label,
  classNames,
  isDisabled = false,
  withText = true,
  icon,
  iconPosition,
  ...rest
}: ButtonProps<T>) {
  const Tag = (as ?? "button") as React.ElementType;

  return (
    <Tag
      className={"flex items-center justify-center font-medium" + " " + classNames}
      {...(Tag === "button" ? { disabled: isDisabled } : {})}
      {...(rest as React.ComponentPropsWithoutRef<typeof Tag>)}
    >
      {icon && iconPosition === "left" && icon}
      {withText && label ? label : null}
      {icon && iconPosition === "right" && icon}
      {icon && !iconPosition && icon}
    </Tag>
  );
}
