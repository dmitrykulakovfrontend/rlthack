import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import crossSVG from "@/../public/images/icons/cross.svg";
import supplierSVG from "@/../public/images/icons/user-icon.svg";
import productSVG from "@/../public/images/icons/product.svg";
import categorySVG from "@/../public/images/icons/category.svg";
import plusSVG from "@/../public/images/icons/plus.svg";

import Image from "next/future/image";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Slider } from "@mui/material";
import Sidebar from "@/components/Sidebar";

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

const mock = [
  {
    name: "ИП Иванов Иван Иванович",
    inn: "ИНН 6894736383922",
    role: "Производитель",
    score: "Надёжный",
    type: "supplier" as const,
  },
  {
    name: "ИП Иванов Иван Иванович",
    inn: "ИНН 6894736383912",
    role: "Поставщик",
    score: "Хороший",
    type: "supplier" as const,
  },
  {
    name: "ИП Иванов Иван Иванович",
    inn: "ИНН 6894736383932",
    role: "Дистрибьютор",
    score: "Нормальный",
    type: "supplier" as const,
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
    type: "supplier" as const,
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
export const scores: { [key: string]: string } = {
  Надёжный: "bg-green-200",
  Хороший: "bg-emerald-100",
  Нормальный: "bg-emerald-50",
  Сомнительный: "bg-yellow-100",
};

const images: Record<(typeof mock)[number]["type"], string> = {
  category: categorySVG,
  supplier: supplierSVG,
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
      <Sidebar />
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
                className={`py-2 border-transparent bg-white rounded-bl-lg`}
                align="center"
              ></td>
              <td
                className={`py-2 border-transparent bg-white`}
                align="center"
              ></td>
              <td className="py-2 border-transparent bg-white" align="center">
                <span className="text-sm text-gray-600">Цена (₽)</span>
              </td>
              <td className="py-2 border-transparent bg-white" align="center">
                <span className="text-sm text-gray-600">Роль</span>
              </td>
              <td
                className={`py-2 border-transparent bg-white   rounded-br-lg`}
                align="center"
              >
                <span className="text-sm text-gray-600">Оценка</span>
              </td>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, i) => (
              <>
                <div key={item.inn + item.name} className="block h-4"></div>

                <tr
                  key={item.inn ? item.inn : item.name}
                  className="hover:cursor-pointer"
                  onClick={() => {
                    const id = item.inn
                      ? item.inn.replace(/\s/g, "-")
                      : item.name.replace(/\s/g, "-");

                    item.type === "category"
                      ? setCurrentTags([...currentTags, item.name])
                      : router.push(
                          {
                            pathname: `/${item.type}/${id}`,
                            query: item,
                          },
                          `/${item.type}/${id}`
                        );
                  }}
                >
                  <td className={`${tdClassName} rounded-l-lg`} align="center">
                    <Image
                      src={images[item.type]}
                      width={40}
                      height={40}
                      alt=""
                    />
                  </td>
                  <td className={tdClassName}>
                    <div className="flex flex-col  text-sm">
                      <span>{item.name}</span>
                      {item.inn && (
                        <span className="text-gray-500">{item.inn}</span>
                      )}
                    </div>
                  </td>
                  <td className={tdClassName} align="center">
                    {item.price ? (
                      <span className="text-gray-500 text-sm">
                        {formatNumber(item.price)}
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </td>
                  <td className={tdClassName} align="center">
                    <span className="text-gray-500 text-sm">{item.role}</span>
                  </td>
                  <td className={`${tdClassName} rounded-r-lg`} align="center">
                    {item.score ? (
                      <span
                        className={`${
                          scores[item.score]
                        } text-xs px-2 py-1 rounded-2xl`}
                      >
                        {item.score}
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
