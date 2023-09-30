import React from "react";
import CustomLink from "./CustomLink";

type Props = {
  theme?: "secondary" | "primary";
  href?: URL | string;
  linkProps?: React.ComponentPropsWithoutRef<typeof CustomLink>;
} & React.ComponentProps<"button">;

export default function Button({
  theme = "primary",
  children,
  className,
  linkProps,
  ...rest
}: Props) {
  const themes: Record<typeof theme, string> = {
    primary:
      "hover:bg-blue-700 hover:bg-opacity-30 rounded-lg border border-blue-700",
    secondary:
      "hover:bg-blue-700 hover:bg-opacity-30 rounded-lg  bg-blue-100 text-blue-700",
  };
  return linkProps ? (
    <CustomLink className={`${themes[theme]} ${className}`} {...linkProps}>
      {children}
    </CustomLink>
  ) : (
    <button className={`${themes[theme]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
