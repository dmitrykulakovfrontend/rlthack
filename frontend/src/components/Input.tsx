import React from "react";
import searchSVG from "@/../public/images/icons/search.svg";
import Image from "next/image";

type Props = {
  search?: boolean;
  wrapperClassName?: string;
} & React.ComponentProps<"input">;

function Input({ search, wrapperClassName, ...rest }: Props) {
  return (
    <div className={`rounded-3xl relative bg-white ${wrapperClassName}`}>
      <input
        className={`h-full text-black w-full py-4 px-8 rounded-3xl ${
          search ? "pr-20" : ""
        }`}
        {...rest}
      />
      {search && (
        <button className="absolute right-0 top-1/2 -translate-y-1/2 mr-8 z-10">
          <Image alt="" src={searchSVG} width={32} />
        </button>
      )}
    </div>
  );
}

export default Input;
