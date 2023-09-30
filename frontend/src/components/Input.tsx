import React from "react";
import Image from "next/future/image";

import crossSVG from "@/../public/images/icons/cross.svg";
import searchSVG from "@/../public/images/icons/search.svg";

type Props = {
  search?: boolean;
  wrapperClassName?: string;
  onIconClick?: () => void;
  onClearClick?: () => void;
  clearButton?: boolean;
} & React.ComponentProps<"input">;

function Input({
  search,
  wrapperClassName,
  onIconClick,
  onClearClick,
  className,
  clearButton,
  ...rest
}: Props) {
  return (
    <div className={`relative w-full bg-white ${wrapperClassName}`}>
      <input
        className={`h-full text-black w-full ${search ? "pr-20" : ""} ${
          clearButton ? "pl-10" : ""
        } ${className}`}
        {...rest}
      />
      {clearButton && (
        <button
          onClick={onClearClick}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
        >
          <Image src={crossSVG} alt="" />
        </button>
      )}
      {search && (
        <button
          onClick={onIconClick}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-10"
        >
          <Image alt="" src={searchSVG} width={32} />
        </button>
      )}
    </div>
  );
}

export default Input;
