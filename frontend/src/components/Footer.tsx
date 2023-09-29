import React from "react";
import Image from "next/image";

import roseltorgLogoSVG from "@/../public/images/icons/roseltorg-logo-1.svg";
import hhSVG from "@/../public/images/icons/menu-32-x-32-icon-hh-1.svg";
import vkSVG from "@/../public/images/icons/menu-32-x-32-vkontakte.svg";
import dzenSVG from "@/../public/images/icons/menu-32-x-32-dzen.svg";
import telegramSVG from "@/../public/images/icons/menu-32-x-32-icn-telegram-1.svg";
import youtubeSVG from "@/../public/images/icons/youtube.svg";
import Link from "next/link";

type Props = {};

function Footer({}: Props) {
  return (
    <footer className="bg-white shadow-top shadow-white flex px-16 items-center flex-col gap-8 py-8">
      <Link href={"/"}>
        <Image alt="" src={roseltorgLogoSVG} />
      </Link>
      <nav className="flex text-lg justify-between w-full">
        <Link href="#">2023</Link>
        <Link href="#">Политика конфиденциальности</Link>
        <Link href="#">Согласие на обработку персональных данных</Link>
        <div className="flex gap-16">
          <Link href="#">
            <Image src={hhSVG} alt="" />
          </Link>
          <Link href="#">
            <Image src={vkSVG} alt="" />
          </Link>
          <Link href="#">
            <Image src={dzenSVG} alt="" />
          </Link>
          <Link href="#">
            <Image src={telegramSVG} alt="" />
          </Link>
          <Link href="#">
            <Image src={youtubeSVG} alt="" />
          </Link>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
