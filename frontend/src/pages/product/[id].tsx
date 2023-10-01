import Sidebar from "@/components/Sidebar";
import Image from "next/future/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import productSVG from "@/../public/images/icons/product-square.svg";
import CustomerCard from "@/components/CustomerCard";

type Props = {};

function Product({}: Props) {
  const router = useRouter();
  const [product, setProduct] = useState<Record<string, any>>({});
  console.log(product);
  useEffect(() => {
    setProduct(router.query);
  }, [router]);
  return product.price ? (
    <main className="flex font-exo2 py-16 min-h-screen gap-8 px-24">
      <Sidebar goBackButton />
      <div className="flex flex-col gap-8">
        <p className="text-3xl text-white">Товар</p>
        <div className="bg-white flex items-start gap-8 p-8 rounded-lg">
          <div>
            <div className="w-full text-xl">
              <h2 className="text-2xl text-slate-900 mb-4">{product.name}</h2>
              <p>
                <span className=" font-semibold  text-gray-500 ">
                  Категория{" "}
                </span>
                <span className="ml-4">
                  Компьютеры, их части и принадлежности
                </span>
              </p>
              <p>
                <span className="text-xl font-semibold text-gray-500">
                  Артикул
                </span>{" "}
                <span className="ml-4">1926547</span>
              </p>
              <p>
                <span className="text-xl font-semibold text-gray-500">
                  Цена
                </span>{" "}
                <span className="ml-4">47.990 ₽</span>
              </p>
              <p>
                <span className="text-xl font-semibold text-gray-500">
                  Количество отзывов
                </span>{" "}
                <span className="ml-4">14</span>
              </p>
              <p>
                <span className="text-xl font-semibold text-gray-500">
                  Средняя оценка
                </span>{" "}
                <span className="ml-4">8.5/10</span>
              </p>
              <p>
                <span className="text-xl font-semibold text-gray-500">
                  Страна
                </span>{" "}
                <span className="ml-4">Россия</span>
              </p>
            </div>
            <div className="w-full max-w-2xl mt-14 p-4 rounded-lg bg-blue-100">
              <h3 className="text-xl font-semibold">
                Подробные характеристики
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque sit amet eleifend mauris. Phasellus aliquam
                scelerisque nisl in maximus. Curabitur sapien ligula, consequat
                vitae fermentum id, consectetur et neque. In lacus quam,
                pulvinar vitae faucibus eget, molestie ac nisl.
              </p>
            </div>
          </div>
          <Image className="" src={productSVG} alt="" />
        </div>
        <p className="text-3xl text-white">Информация о поставщике</p>
        <CustomerCard
          supplier={{
            name: "ИП Иванов Иван Иванович",
            inn: "ИНН 6894736383912",
            score: "Хороший",
          }}
        />
      </div>
    </main>
  ) : (
    "Loading..."
  );
}

export default Product;
