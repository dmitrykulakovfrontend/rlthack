import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import bellSVG from "@/../public/images/icons/icon-outline-bell.svg";
import folderSVG from "@/../public/images/icons/icon-outline-folder.svg";
import chartSVG from "@/../public/images/icons/icon-outline-chart-bar.svg";
import userSVG from "@/../public/images/icons/icon-outline-user.svg";
import userIconSVG from "@/../public/images/icons/user-icon.svg";
import usersSVG from "@/../public/images/icons/icon-outline-users.svg";
import homeSVG from "@/../public/images/icons/icon-outline-home.svg";
import chartSquareBarSVG from "@/../public/images/icons/icon-outline-chart-square-bar.svg";
import filterSVG from "@/../public/images/icons/filter.svg";
import crossSVG from "@/../public/images/icons/cross.svg";

import CustomLink from "@/components/CustomLink";
import Image from "next/future/image";
import Input from "@/components/Input";
import Button from "@/components/Button";
type Props = {};

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

const mock = [
  {
    name: "ИП Иванов Иван Иванович",
    inn: "ИНН 689473638392",
    role: "Производитель",
    score: "Надёжный" as const,
  },
  {
    name: "ИП Иванов Иван Иванович",
    inn: "ИНН 689473638392",
    role: "Поставщик",
    score: "Хороший" as const,
  },
  {
    name: "ИП Иванов Иван Иванович",
    inn: "ИНН 689473638392",
    role: "Дистрибьютор",
    score: "Нормальный" as const,
  },
  {
    name: "ИП Иванов Иван Иванович",
    inn: "ИНН 689473638392",
    role: "Производитель",
    score: "Сомнительный" as const,
  },
];

const scores: Record<(typeof mock)[number]["score"], string> = {
  Надёжный: "bg-green-200",
  Хороший: "bg-emerald-100",
  Нормальный: "bg-emerald-50",
  Сомнительный: "bg-yellow-100",
};

function Search({}: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (typeof router.query.q === "string") {
      setSearch(router.query.q);
    }
  }, [router]);

  const tdClassName =
    "border-b-[12px] py-2 border-transparent  bg-white bg-clip-padding first-of-type:rounded-l-[16px] last-of-type:rounded-r-[16px]";

  console.log(search);
  console.log(router.query);
  return (
    <main className="flex font-exo2 py-16 min-h-screen gap-8 px-24">
      <nav className="p-8 font-medium h-fit bg-white rounded-lg w-full max-w-xs flex flex-col gap-6">
        <CustomLink className="flex gap-2" href="">
          <Image src={homeSVG} alt="" />
          Главная страница
        </CustomLink>
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
      <div className="bg-transparent h-fit w-full rounded-lg">
        <div className="border-b bg-white flex items-center gap-4 border-zinc-200 rounded-t-lg pr-2">
          <Input
            clearButton
            value={search}
            wrapperClassName="rounded-tl-lg"
            className="py-2 rounded-tl-lg"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>
            <Image src={filterSVG} alt="" />
          </button>
          <Button theme="secondary" className="py-1 px-6">
            Найти
          </Button>
        </div>
        <div className="border-b  bg-white flex items-center gap-2 border-zinc-200 py-3 px-4">
          <button className="bg-white shadow-blue mr-2 p-0.5 border">
            <Image src={crossSVG} alt="" />
          </button>
          <button className="bg-white text-sm flex items-center gap-2 shadow-blue p-1 border rounded-lg px-3">
            Поставщик <Image src={crossSVG} alt="" />
          </button>
          <button className="bg-white text-sm flex items-center gap-2 shadow-blue p-1 border rounded-lg px-3">
            Производитель <Image src={crossSVG} alt="" />
          </button>
          <button className="bg-white text-sm flex items-center gap-2 shadow-blue p-1 border rounded-lg px-3">
            Дистрибьютор <Image src={crossSVG} alt="" />
          </button>
          <button className="bg-white text-sm flex items-center gap-2 shadow-blue p-1 border rounded-lg px-3">
            Заказчик <Image src={crossSVG} alt="" />
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <td
                className="border-b-[30px] py-2 border-transparent bg-white bg-clip-padding rounded-bl-[24px]"
                align="center"
              ></td>
              <td
                className="border-b-[30px] py-2  border-transparent bg-white bg-clip-padding"
                align="center"
              ></td>
              <td
                className="border-b-[30px] py-2  border-transparent bg-white bg-clip-padding"
                align="center"
              >
                <span className="text-sm text-gray-600">Роль</span>
              </td>
              <td
                className="border-b-[30px] py-2  border-transparent bg-white bg-clip-padding rounded-br-[24px]"
                align="center"
              >
                <span className="text-sm text-gray-600">Оценка</span>
              </td>
            </tr>
          </thead>
          <tbody>
            {mock.map(({ inn, name, role, score }, i) => (
              <tr key={inn}>
                <td
                  className={`${
                    i === 0 ? "!rounded-tl-[24px]" : ""
                  } ${tdClassName}`}
                  align="center"
                >
                  <Image src={userIconSVG} alt="" />
                </td>
                <td className={tdClassName}>
                  <div className="flex flex-col  text-sm">
                    <span>{name}</span>
                    <span className="text-gray-500">{inn}</span>
                  </div>
                </td>
                <td className={tdClassName} align="center">
                  <span className="text-gray-500 text-sm">{role}</span>
                </td>
                <td
                  className={`${
                    i === 0 ? "!rounded-tr-[24px]" : ""
                  } ${tdClassName}`}
                  align="center"
                >
                  <span
                    className={`${scores[score]} text-xs px-2 py-1 rounded-2xl`}
                  >
                    {score}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Search;
