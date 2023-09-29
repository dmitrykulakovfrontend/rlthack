import React from "react";
import Image from "next/future/image";

import roseltorgLogoSVG from "@/../public/images/icons/roseltorg-logo-1.svg";
import hhSVG from "@/../public/images/icons/menu-32-x-32-icon-hh-1.svg";
import vkSVG from "@/../public/images/icons/menu-32-x-32-vkontakte.svg";
import dzenSVG from "@/../public/images/icons/menu-32-x-32-dzen.svg";
import telegramSVG from "@/../public/images/icons/menu-32-x-32-icn-telegram-1.svg";
import youtubeSVG from "@/../public/images/icons/youtube.svg";
import CustomLink from "./CustomLink";

type Props = {};

function Footer({}: Props) {
  return (
    <footer className="bg-white shadow-top shadow-white flex px-16 items-center flex-col gap-8 py-8">
      <CustomLink href="/">
        <Image alt="" src={roseltorgLogoSVG} />
      </CustomLink>
      <nav className="flex text-lg justify-between w-full">
        <CustomLink href="/">2023</CustomLink>
        <CustomLink href="/">Политика конфиденциальности</CustomLink>
        <CustomLink href="/">
          Согласие на обработку персональных данных
        </CustomLink>
        <div className="flex gap-16">
          <CustomLink href="/">
            <Image src={hhSVG} alt="" />
          </CustomLink>
          <CustomLink href="/">
            <Image src={vkSVG} alt="" />
          </CustomLink>
          <CustomLink href="/">
            <Image src={dzenSVG} alt="" />
          </CustomLink>
          <CustomLink href="/">
            <Image src={telegramSVG} alt="" />
          </CustomLink>
          <CustomLink href="/">
            <Image src={youtubeSVG} alt="" />
          </CustomLink>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
