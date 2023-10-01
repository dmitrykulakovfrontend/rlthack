import React from "react";
import Image from "next/future/image";

import supplierSVG from "@/../public/images/icons/user-icon.svg";

type Props = {
  supplier: {
    name: string;
    inn: string;
    score: string;
  };
};

function CustomerCard({ supplier }: Props) {
  return (
    <div className="bg-white flex items-start gap-8 p-8 rounded-lg">
      <Image
        className="w-full max-w-[128px]"
        src={supplierSVG}
        width={128}
        height={128}
        alt=""
      />
      <div className="w-full max-w-xs text-xl">
        <h2 className="text-2xl text-slate-900 mb-4">{supplier.name}</h2>
        <p>
          <span className=" font-semibold  text-gray-500 ">ИНН </span>
          <span className="ml-4">{supplier.inn.replace(/[^\d]/g, "")}</span>
        </p>
        <p>
          <span className="text-xl font-semibold text-gray-500">ОГРН</span>{" "}
          <span className="ml-4">1031758642103</span>
        </p>
        <p>
          <span className="text-xl font-semibold text-gray-500">
            Время на рынке
          </span>{" "}
          <span className="ml-4">7 лет</span>
        </p>
        <p>
          <span className="text-xl font-semibold text-gray-500">Оценка</span>{" "}
          <span className="ml-4">{supplier.score}</span>
        </p>
      </div>
      <div className="w-full max-w-2xl mt-14 p-4 rounded-lg bg-blue-100">
        <h3 className="text-xl font-semibold">Описание</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          sit amet eleifend mauris. Phasellus aliquam scelerisque nisl in
          maximus. Curabitur sapien ligula, consequat vitae fermentum id,
          consectetur et neque. In lacus quam, pulvinar vitae faucibus eget,
          molestie ac nisl.
        </p>
      </div>
    </div>
  );
}

export default CustomerCard;
