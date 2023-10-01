import React from "react";
import CustomLink from "./CustomLink";
import Image from "next/future/image";

import bellSVG from "@/../public/images/icons/icon-outline-bell.svg";
import folderSVG from "@/../public/images/icons/icon-outline-folder.svg";
import chartSVG from "@/../public/images/icons/icon-outline-chart-bar.svg";
import userSVG from "@/../public/images/icons/icon-outline-user.svg";
import usersSVG from "@/../public/images/icons/icon-outline-users.svg";
import homeSVG from "@/../public/images/icons/icon-outline-home.svg";
import chartSquareBarSVG from "@/../public/images/icons/icon-outline-chart-square-bar.svg";
import arrowLeftSVG from "@/../public/images/icons/arrow-left.svg";

import Button from "./Button";
import { useRouter } from "next/router";

type Props = {
  goBackButton?: boolean;
};

const sidebar = [
  {
    category: "Мой профиль",
    children: [
      {
        title: "Заявки",
        icon: bellSVG,
        href: "",
      },
      {
        title: "Сохраненное",
        icon: folderSVG,
        href: "",
      },
    ],
  },
  {
    category: "Аналитика",
    children: [
      {
        title: "Общий рейтинг",
        icon: chartSVG,
        href: "",
      },
      {
        title: "Заказчики",
        icon: userSVG,
        href: "",
      },
      {
        title: "Поставщики",
        icon: usersSVG,
        href: "",
      },
      {
        title: "Уровень цен",
        icon: chartSquareBarSVG,
        href: "",
      },
    ],
  },
];

function Sidebar({ goBackButton }: Props) {
  const router = useRouter();
  return (
    <div className=" w-full max-w-xs  h-fit">
      <nav className="p-8 font-medium bg-white rounded-lg flex flex-col gap-6">
        {sidebar.map(({ category, children }) => (
          <div key={category} className="flex flex-col gap-4">
            <span className="text-gray-400 uppercase tracking-wide text-xs">
              {category}
            </span>
            <ul className="flex flex-col gap-4">
              {children.map((link) => (
                <CustomLink
                  href={link.href}
                  className="flex gap-2"
                  key={link.title}
                >
                  <Image src={link.icon} alt="" />
                  <span className="text-sm">{link.title}</span>
                </CustomLink>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      {goBackButton && (
        <Button
          theme="dark"
          className="flex gap-8 p-4 mt-4 font-montserrat items-center"
          onClick={() => router.back()}
        >
          <Image src={arrowLeftSVG} alt="" /> Вернуться к поиску
        </Button>
      )}
    </div>
  );
}

export default Sidebar;
