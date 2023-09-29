import React from "react";
import Image from "next/image";
import Button from "./Button";

import roseltorgLogoSVG from "@/../public/images/icons/roseltorg-logo-1.svg";
import twoHumanSVG from "@/../public/images/icons/two-human.svg";
import twoHuman2SVG from "@/../public/images/icons/two-human-2.svg";
import technologyCubeSVG from "@/../public/images/icons/technology-cube.svg";
import questionSVG from "@/../public/images/icons/question.svg";
import humanSVG from "@/../public/images/icons/human.svg";
import Link from "next/link";

type Props = {};

export default function Header({}: Props) {
  const buttonClassName =
    "flex hover:bg-blue-700 hover:bg-opacity-30 items-center gap-3 px-3 rounded-lg border border-blue-700";
  return (
    <header className="bg-white z-50 font-exo2 h-20 fixed top-0 left-0 w-full flex gap-4 py-5 shadow-bottom shadow-white justify-between px-16">
      <Link href={"/"}>
        <Image alt="" src={roseltorgLogoSVG} />
      </Link>
      <Button className={buttonClassName}>
        <Image src={twoHumanSVG} alt="" />
        Заказчикам
      </Button>
      <Button className={buttonClassName}>
        <Image src={twoHuman2SVG} alt="" />
        Поставщикам
      </Button>
      <Button className={buttonClassName}>
        <Image src={technologyCubeSVG} alt="" />О площадке
      </Button>
      <Button className={buttonClassName}>
        <Image src={questionSVG} alt="" />
        Помощь
      </Button>
      <Button className={buttonClassName}>
        <Image src={humanSVG} alt="" />
        Личный кабинет
      </Button>
    </header>
  );
}
