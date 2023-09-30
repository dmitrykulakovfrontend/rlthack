import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import bellSVG from "@/../public/images/icons/icon-outline-bell.svg";
import folderSVG from "@/../public/images/icons/icon-outline-folder.svg";
import chartSVG from "@/../public/images/icons/icon-outline-chart-bar.svg";
import userSVG from "@/../public/images/icons/icon-outline-user.svg";
import customerSVG from "@/../public/images/icons/user-icon.svg";
import usersSVG from "@/../public/images/icons/icon-outline-users.svg";
import homeSVG from "@/../public/images/icons/icon-outline-home.svg";
import chartSquareBarSVG from "@/../public/images/icons/icon-outline-chart-square-bar.svg";
import filterSVG from "@/../public/images/icons/filter.svg";
import crossSVG from "@/../public/images/icons/cross.svg";
import productSVG from "@/../public/images/icons/product.svg";
import categorySVG from "@/../public/images/icons/category.svg";
import plusSVG from "@/../public/images/icons/plus.svg";

import CustomLink from "@/components/CustomLink";
import Image from "next/future/image";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Box, Slider } from "@mui/material";

type Props = {};

const marks = [
  {
    value: 10000,
    label: "10.000₽",
  },
  {
    value: 100000,
    label: "100.000₽",
  },
];
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
    inn: "ИНН 6894736383922",
    role: "Производитель",
    score: "Надёжный",
    type: "customer" as const,
  },
  {
    name: "ИП Иванов Иван Иванович",
    inn: "ИНН 6894736383912",
    role: "Поставщик",
    score: "Хороший",
    type: "customer" as const,
  },
  {
    name: "ИП Иванов Иван Иванович",
    inn: "ИНН 6894736383932",
    role: "Дистрибьютор",
    score: "Нормальный",
    type: "customer" as const,
  },
  {
    name: "Ноутбук Huawei MateBook D 151 BOD-WDI9",
    role: "Товар",
    score: "Хороший",
    type: "product" as const,
    price: 47_990,
  },
  {
    name: "ИП Иванов Иван Иванович",
    inn: "ИНН 6894736384392",
    role: "Производитель",
    score: "Сомнительный",
    type: "customer" as const,
  },
  {
    name: "Ноутбук Huawei MateBook D 15 BOD-WDI9",
    role: "Товар",
    score: "Хороший",
    type: "product" as const,
    price: 47_990,
  },
  {
    name: "Компьютеры, их части и принадлежности",
    role: "Категория",
    type: "category" as const,
  },
];
const scores: { [key: string]: string } = {
  Надёжный: "bg-green-200",
  Хороший: "bg-emerald-100",
  Нормальный: "bg-emerald-50",
  Сомнительный: "bg-yellow-100",
};

const images: Record<(typeof mock)[number]["type"], string> = {
  category: categorySVG,
  customer: customerSVG,
  product: productSVG,
};
const minDistance = 10;
const defaultTags = ["Производитель", "Поставщик", "Дистрибьютор", "Товар"];
function Search({}: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const [price, setPrice] = useState<[number, number]>([0, 100000]);
  const [tags, setTags] = useState(defaultTags);
  const [items, setItem] = useState(mock);
  const [filteredItems, setFilteredItems] = useState<typeof items>([]);
  const [isFiltersOpen, setFiltersOpen] = useState(false);

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPrice([Math.min(newValue[0], price[1] - minDistance), price[1]]);
    } else {
      setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)]);
    }
  };
  useEffect(() => {
    if (typeof router.query.q === "string") {
      setSearch(router.query.q);
    }
  }, [router]);
  useEffect(() => {
    const newFilteredItems = items.filter((item) => {
      if (currentTags.length > 0 && !currentTags.includes(item.role)) {
        return false;
      }
      if (item.price && (item.price < price[0] || item.price > price[1])) {
        return false;
      }
      return true;
    });
    setFilteredItems(newFilteredItems);
  }, [price, currentTags]);

  function addTag(tag: string) {
    setCurrentTags([...currentTags, tag]);
    setTags(tags.filter((t) => t !== tag));
  }

  function removeTag(tag: string) {
    setCurrentTags(currentTags.filter((t) => t !== tag));
    setTags([...tags, tag]);
  }

  function resetTags() {
    setCurrentTags([]);
    setTags(defaultTags);
  }

  const tdClassName = "py-2 border-transparent  bg-white  min-w-[190px]";

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
            className="py-4 rounded-tl-lg"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            theme="main"
            onClick={() => setFiltersOpen(!isFiltersOpen)}
            className="py-2 px-8"
          >
            Фильтры
          </Button>
          <Button theme="secondary" className="py-2 px-8">
            Найти
          </Button>
        </div>
        <div className="border-b  bg-white flex items-center gap-2 border-zinc-200 py-3 px-4">
          <button className="bg-white shadow-blue mr-2 p-0.5 border">
            <Image src={crossSVG} alt="" onClick={resetTags} />
          </button>

          {currentTags.map((tag) => (
            <button
              key={tag}
              className="bg-white text-sm flex items-center gap-2 shadow-blue p-1 border rounded-lg px-3"
              onClick={() => removeTag(tag)}
            >
              {tag} <Image src={crossSVG} alt="" />
            </button>
          ))}
        </div>
        <div
          className={`bg-white  transition-all overflow-hidden duration-500 ${
            isFiltersOpen ? "max-h-screen  px-4 pt-2 pb-8" : "max-h-0"
          }`}
        >
          <p className="my-2">Фильтры</p>
          <div className="w-1/3 pl-4">
            <Slider
              getAriaLabel={() => "Минимальная и максимальная цена"}
              defaultValue={0}
              max={100000}
              min={10000}
              value={price}
              step={1000}
              onChange={handleChange}
              valueLabelDisplay="auto"
              marks={marks}
              valueLabelFormat={(e) => e + "₽"}
            />
          </div>
          <div className="flex gap-4">
            {tags.map((tag) => (
              <button
                key={tag}
                className="bg-white text-sm flex items-center gap-2 shadow-blue p-1 border rounded-lg px-3"
                onClick={() => addTag(tag)}
              >
                {tag} <Image src={plusSVG} alt="" />
              </button>
            ))}
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <td
                className={`py-2 border-transparent bg-white rounded-l-lg`}
                align="center"
              ></td>
              <td
                className={`py-2 border-transparent bg-white`}
                align="center"
              ></td>
              <td
                className="py-2 border-transparent bg-white"
                align="center"
              ></td>
              <td className="py-2 border-transparent bg-white" align="center">
                <span className="text-sm text-gray-600">Цена (₽)</span>
              </td>
              <td className="py-2 border-transparent bg-white" align="center">
                <span className="text-sm text-gray-600">Роль</span>
              </td>
              <td
                className={`py-2 border-transparent bg-white  `}
                align="center"
              >
                <span className="text-sm text-gray-600">Оценка</span>
              </td>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(({ inn, name, role, score, price, type }, i) => (
              <>
                <div className="block h-4"></div>
                <tr
                  key={inn ? inn : name}
                  className="hover:cursor-pointer"
                  onClick={() => router.push("/")}
                >
                  <div className="block h-4"></div>
                  <td className={`${tdClassName} rounded-l-lg`} align="center">
                    <Image src={images[type]} width={40} height={40} alt="" />
                  </td>
                  <td className={tdClassName}>
                    <div className="flex flex-col  text-sm">
                      <span>{name}</span>
                      {inn && <span className="text-gray-500">{inn}</span>}
                    </div>
                  </td>
                  <td className={tdClassName} align="center">
                    {price ? (
                      <span className="text-gray-500 text-sm">
                        {formatNumber(price)}
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </td>
                  <td className={tdClassName} align="center">
                    <span className="text-gray-500 text-sm">{role}</span>
                  </td>
                  <td className={`${tdClassName} rounded-r-lg`} align="center">
                    {score ? (
                      <span
                        className={`${scores[score]} text-xs px-2 py-1 rounded-2xl`}
                      >
                        {score}
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function formatNumber(value: string | number) {
  if (typeof value === "string") {
    value = value.includes(".") ? parseFloat(value) : parseInt(value);
  }
  return value.toLocaleString("en-US");
}

export default Search;
