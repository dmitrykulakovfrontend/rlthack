import Sidebar from "@/components/Sidebar";
import Image from "next/future/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import productSVG from "@/../public/images/icons/product-square.svg";
import { Product, formatNumber } from "../search";

type Props = {};

function Product({}: Props) {
  const router = useRouter();
  const [product, setProduct] = useState<Product>();
  console.log(product);
  useEffect(() => {
    setProduct(router.query as unknown as Product);
  }, [router]);
  return product ? (
    <main className="flex font-exo2 py-16 min-h-screen gap-8 px-24">
      <Sidebar goBackButton />
      <div className="flex flex-col gap-8 w-full">
        <p className="text-3xl text-white">Товар</p>
        <div className="bg-white flex items-start justify-between gap-8 p-8 rounded-lg">
          <div>
            <div className="w-full text-xl">
              <h2 className="text-2xl text-slate-900 mb-4">{product.Name}</h2>
              <p>
                <span className=" font-semibold  text-gray-500 ">
                  Категория{" "}
                </span>
                <span className="ml-4">{product.Category}</span>
              </p>

              <p>
                <span className="text-xl font-semibold text-gray-500">
                  Цена
                </span>{" "}
                <span className="ml-4">{formatNumber(product.Price)} ₽</span>
              </p>
              <p>
                <span className="text-xl font-semibold text-gray-500">
                  Количество отзывов
                </span>{" "}
                <span className="ml-4">{product.NReviews}</span>
              </p>
              <p>
                <span className="text-xl font-semibold text-gray-500">
                  Средняя оценка
                </span>{" "}
                <span className="ml-4">{product.Rating}/10</span>
              </p>
              <p>
                <span className="text-xl font-semibold text-gray-500">
                  Страна
                </span>{" "}
                <span className="ml-4">{product.Country}</span>
              </p>
            </div>
          </div>
          <Image className="" src={productSVG} alt="" />
        </div>
      </div>
    </main>
  ) : (
    "Loading..."
  );
}

export default Product;
