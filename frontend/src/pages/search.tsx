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
export type Product = {
  ID: number;
  INN: number;
  Name: string;
  Price: number;
  Category: Category;
  NReviews: number;
  Rating: number;
  Country: Country;
  Volume: number;
  lemm_name: string;
  KNN: number;
};
export enum Category {
  Laptop = "laptop",
}

export enum Country {
  Россия = "Россия",
}
function Search({}: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const [price, setPrice] = useState<[number, number]>([0, 100000]);
  const [tags, setTags] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
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
      executeSearch(router.query.q);
    }
  }, [router]);
  useEffect(() => {
    const newFilteredProducts = products.filter((product) => {
      if (
        product.Price &&
        (product.Price < price[0] || product.Price > price[1])
      ) {
        return false;
      }
      return true;
    });
    setFilteredProducts(newFilteredProducts);
  }, [price, currentTags, products]);

  function addTag(tag: string) {
    setCurrentTags([...currentTags, tag]);
    setTags(tags.filter((t) => t !== tag));
  }

  function removeTag(tag: string) {
    setCurrentTags(currentTags.filter((t) => t !== tag));
    setTags([...tags, tag]);
  }

  async function executeSearch(query: string) {
    // 91.185.84.154
    const response = await fetch(
      "http://91.185.84.154:5000/intellect_search/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: query,
        }),
      }
    );
    console.log("response: ", response);
    const data = (await response.json()) as Product[];
    console.log("data: ", data);
    setProducts(data);
    const uniqueTags = Array.from(
      new Set(data.map((product) => product.Category))
    );
    setTags(uniqueTags);
  }

  function resetTags() {
    setCurrentTags([]);
    setTags([...currentTags]);
  }

  const tdClassName = "py-2 border-transparent  bg-white  min-w-[190px]";

  return (
    <main className="flex font-exo2 py-16 min-h-screen gap-8 px-24">
      <Sidebar />
      <div className="bg-transparent h-fit w-full rounded-lg">
        <div className="border-b bg-white flex products-center gap-4 border-zinc-200 rounded-t-lg pr-2">
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
          <Button
            onClick={() => executeSearch(search)}
            theme="secondary"
            className="py-2 px-8"
          >
            Найти
          </Button>
        </div>
        <div className="border-b  bg-white flex products-center gap-2 border-zinc-200 py-3 px-4">
          <button className="bg-white shadow-blue mr-2 p-0.5 border">
            <Image src={crossSVG} alt="" onClick={resetTags} />
          </button>

          {currentTags.map((tag) => (
            <button
              key={tag}
              className="bg-white text-sm flex products-center gap-2 shadow-blue p-1 border rounded-lg px-3"
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
                className="bg-white text-sm flex products-center gap-2 shadow-blue p-1 border rounded-lg px-3"
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
            {filteredProducts.map((product, i) => (
              <>
                <div key={product.ID} className="block h-4"></div>

                <tr
                  key={product.INN}
                  className="hover:cursor-pointer"
                  onClick={() => {
                    router.push(
                      {
                        pathname: `/product/${product.ID}`,
                        query: product,
                      },
                      `/product/${product.ID}`
                    );
                  }}
                >
                  <td className={`${tdClassName} rounded-l-lg`} align="center">
                    <Image src={productSVG} width={40} height={40} alt="" />
                  </td>
                  <td className={tdClassName}>
                    <div className="flex flex-col  text-sm">
                      <span>{product.Name}</span>
                      <span className="text-gray-500">{product.INN}</span>
                    </div>
                  </td>
                  <td className={tdClassName} align="center">
                    <span className="text-gray-500 text-sm">
                      {formatNumber(product.Price)}
                    </span>
                  </td>
                  <td className={tdClassName} align="center">
                    <span className="text-gray-500 text-sm">
                      {product.Category}
                    </span>
                  </td>
                  <td className={`${tdClassName} rounded-r-lg`} align="center">
                    <span
                      className={`${scores["Нормальный"]} text-xl px-2 py-1 rounded-2xl`}
                    >
                      {product.Rating}
                    </span>
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

export function formatNumber(value: string | number) {
  if (typeof value === "string") {
    value = value.includes(".") ? parseFloat(value) : parseInt(value);
  }
  return value.toLocaleString("en-US");
}

export default Search;
