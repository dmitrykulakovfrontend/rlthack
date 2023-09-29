import React from "react";
import Link from "next/link";

type Props = React.ComponentPropsWithoutRef<typeof Link>;

function CustomLink({ children, className, ...rest }: Props) {
  return (
    <Link {...rest}>
      <a className={className}>{children}</a>
    </Link>
  );
}

export default CustomLink;
