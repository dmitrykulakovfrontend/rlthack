import React from "react";

type Props = {
  children: React.ReactNode;
} & React.ComponentProps<"button">;

export default function Button({ children, ...rest }: Props) {
  return <button {...rest}>{children}</button>;
}
