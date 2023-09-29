"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../constants";

import dotsSVG from "@/../public/images/background-dots-1.svg";
import dots2SVG from "@/../public/images/background-dots-2.svg";
import iconsSVG from "@/../public/images/icons/icons-group.svg";
import twoHumanSVG from "@/../public/images/icons/two-human.svg";
import twoHuman2SVG from "@/../public/images/icons/two-human-2.svg";
import ellipseBigSVG from "@/../public/images/ellipse-big.svg";
import ellipseSmallSVG from "@/../public/images/ellipse-small.svg";
import questionSVG from "@/../public/images/icons/question.svg";
import documentSVG from "@/../public/images/icons/document.svg";
import talkSVG from "@/../public/images/icons/talk.svg";
import phoneSVG from "@/../public/images/icons/phone.svg";

import Input from "@/components/Input";
import Link from "next/link";

const advantages = [
  {
    title: "Заказчикам",
    bulletPoints: [
      "Сотни категорий товаров и тысячи позиций",
      "Актуальные данные и отзывы о продавцах",
      "Аналитика и мониторинг рынка",
      "Выбирайте лучших поставщиков, дистрибьюторов и производителей",
      "Умный поиск по ценам, артикулам, регионам поставок, брендам и другим характеристикам",
    ],
    icon: twoHuman2SVG,
  },
  {
    title: "Поставщикам",
    bulletPoints: [
      "Полезная платформа для анализа конкурентов, уровня цен и товаров",
      "Круглосуточная единая электронная торговая площадка",
      "Получите выгодный контракт на поставку товаров",
      "Все ваши будущие заказчики в одном месте",
      "Интеллектуальный перечень групп в продуктовом ряду",
    ],
    icon: twoHumanSVG,
  },
];

export default function Home() {
  return (
    <main className=" text-white px-16 my-32 flex flex-col gap-48">
      <Image
        alt=""
        src={dotsSVG}
        className="-z-10 absolute top-0 left-0 w-full h-full"
      />
      <section className="flex flex-col relative gap-12">
        <h1 className="text-6xl font-bold leading-normal">
          Платформа для заказчиков и поставщиков
          <br />с интеллектуальным поиском
        </h1>
        <span className="text-2xl font-medium">
          Тысячи товаров и участников закупок в одном месте
        </span>
        <Input
          wrapperClassName="max-w-4xl"
          placeholder="Поиск по ИНН, ОГРН, категории или товару"
          search
        />
        <Image
          alt=""
          src={iconsSVG}
          className="absolute right-0 top-1/2 -translate-y-1/3 -z-10"
        />
      </section>
      <section className="flex relative flex-col gap-32">
        <Image
          alt=""
          src={dots2SVG}
          className="-z-10 absolute top-0 left-0 w-full"
        />
        {advantages.map((advantage) => (
          <div
            key={advantage.title}
            className="relative rounded-[48px] border-2 border-white shadow-pixelatedFix shadow-white p-8"
          >
            <h2 className="text-4xl font-semibold">{advantage.title}</h2>
            <ul className="list-inside list-disc text-2xl ml-6 mt-4">
              {advantage.bulletPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <Image
              alt=""
              src={advantage.icon}
              className="absolute w-32 right-8 top-1/2 -translate-y-1/2"
            />
          </div>
        ))}
      </section>
      <section className="relative">
        <Image
          alt=""
          src={dots2SVG}
          className="-z-10 absolute top-0 left-0 w-full h-full"
        />
        <Image
          alt=""
          src={ellipseSmallSVG}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <div className="w-fit mx-auto rounded-full">
          <Image alt="" src={ellipseBigSVG} className="wx-auto rounded-full" />
          <h2 className="text-4xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-bold">
            О площадке
          </h2>
        </div>
        <div className="bg-indigo-700 rounded-[40px] border-4 absolute left-12 -top-8  border-white border-opacity-30 backdrop-blur-2xl w-fit py-3 text-2xl px-12">
          Прокачиваем развивающийся сегмент рынка
        </div>
        <div className="bg-slate-500 rounded-[40px] border-4 absolute right-28 top-12   border-white border-opacity-30 backdrop-blur-2xl w-fit py-3 text-2xl px-12">
          Оператор электронных торгов
        </div>
        <div className="bg-emerald-300 rounded-[40px] border-4 absolute -right-8 top-1/2   -translate-y-2/3 border-white border-opacity-30 backdrop-blur-2xl w-fit py-3 text-2xl px-12">
          Агрегатор номенклатур продукций{" "}
        </div>
        <div className="bg-blue-800 rounded-[40px] border-4 absolute -right-16 bottom-12   border-white border-opacity-30 backdrop-blur-2xl w-fit py-3 text-2xl px-12">
          Высокий уровень качества услуг в закупках
        </div>
        <div className="bg-lime-600 rounded-[40px] border-4 absolute left-24 bottom-0   border-white border-opacity-30 backdrop-blur-2xl w-fit py-3 text-2xl px-12">
          Доверие крупнейших игроков рынка
        </div>
        <div className="bg-blue-600 rounded-[40px] border-4 absolute left-0 bottom-1/2   border-white border-opacity-30 backdrop-blur-2xl w-fit py-3 text-2xl px-12">
          Разнообразие категорий и товаров
        </div>
      </section>
      <section className="flex overflow-clip relative flex-col gap-14">
        <Image
          alt=""
          src={dots2SVG}
          className="-z-10 absolute top-0 left-0 w-full"
        />
        <h2 className="text-4xl font-bold">Центр поддержки</h2>
        <div className="flex text-2xl justify-between">
          <Link
            href="#"
            className="bg-black flex gap-8 bg-opacity-20 py-4 px-8 items-center rounded-3xl border-4 border-blue-700"
          >
            <Image src={questionSVG} alt="" />
            <span>Ответы на частые вопросы</span>
          </Link>
          <a
            href="tel:+74951502020"
            className="bg-black items-center flex gap-8  bg-opacity-20 py-4 px-8 rounded-3xl border-4 border-blue-700"
          >
            <Image src={phoneSVG} alt="" />
            <span>+7 495 150 20 20</span>
          </a>
          <Link
            href="#"
            className="bg-black items-center flex gap-8  bg-opacity-20 py-4 px-8 rounded-3xl border-4 border-blue-700"
          >
            <Image src={talkSVG} alt="" />
            <span>Онлайн-чат</span>
          </Link>
          <Link
            href="#"
            className="bg-black items-center flex gap-8  bg-opacity-20 py-4 px-8 rounded-3xl border-4 border-blue-700"
          >
            <Image src={documentSVG} alt="" />
            <span>Библиотека знаний</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
