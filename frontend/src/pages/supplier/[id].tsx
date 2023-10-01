import Sidebar from "@/components/Sidebar";
import Image from "next/future/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import productSVG from "@/../public/images/icons/product.svg";
import { scores } from "../search";
import CustomerCard from "@/components/CustomerCard";

type Props = {};

function Supplier({}: Props) {
  const router = useRouter();
  const [supplier, setSupplier] = useState<Record<string, any>>({});
  console.log(supplier);
  useEffect(() => {
    setSupplier(router.query);
  }, [router]);
  return supplier.inn ? (
    <main className="flex font-exo2 py-16 min-h-screen gap-8 px-24">
      <Sidebar goBackButton />
      <div className="flex flex-col gap-8">
        <p className="text-3xl text-white">Поставщик</p>
        <CustomerCard
          supplier={
            supplier as {
              name: string;
              inn: string;
              score: string;
            }
          }
        />
        <p className="text-3xl text-white">Его продукция</p>
        <div className="flex flex-col gap-4">
          <div className="flex bg-white gap-8 rounded-lg p-4 items-center">
            <div>
              <Image src={productSVG} alt="" />
            </div>
            <div className="mr-auto">Ноутбук Huawei MateBook D 15 BOD-WDI9</div>
            <div className="ml-auto">Товар</div>
            <span
              className={`${
                scores[supplier.score]
              } text-xs px-2 py-1 rounded-2xl ml-auto h-fit`}
            >
              {supplier.score}
            </span>
          </div>
          <div className="flex bg-white gap-8 rounded-lg p-4 items-center">
            <div>
              <Image src={productSVG} alt="" />
            </div>
            <div className="mr-auto">Ноутбук Huawei MateBook D 15 BOD-WDI9</div>
            <div className="ml-auto">Товар</div>
            <span
              className={`${
                scores[supplier.score]
              } text-xs px-2 py-1 rounded-2xl ml-auto h-fit`}
            >
              {supplier.score}
            </span>
          </div>
        </div>
      </div>
    </main>
  ) : (
    "Loading..."
  );
}

export default Supplier;
