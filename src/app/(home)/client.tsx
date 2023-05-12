"use client";

import Form from "@/components/Form";
import { Country } from "@/types/types";
import Image from "next/image";
import { useState } from "react";

interface Props {
  countries: Country[];
  date: string;
}

export default function HomeClient({ countries, date }: Props) {
  const [amount, setAmount] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const updatedAt = new Date(date).toLocaleDateString("es", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const handleChangeCountry = (e: any) => {
    let newCountry: Country | undefined = countries.find(
      (country) => country.code === e.target.value
    );
    if (newCountry === undefined) {
      newCountry = countries[0];
    }
    // setAmount(0);
    setSelectedCountry(newCountry);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <Image
        src={selectedCountry.flag}
        alt="flag"
        width={100}
        height={100}
        className="border-2 border-black rounded-full shadow-md"
      />
      <label htmlFor="country" className="italic fontsemibold text-lg">
        Selecciona el País
      </label>
      <select
        name="country"
        id="country"
        className="rounded-lg p-2 bg-green-700 w-full text-center"
        onChange={handleChangeCountry}
      >
        {countries.map((country: Country) => (
          <option key={country.code} value={country.code} className="p-2">
            {country.name}
          </option>
        ))}
      </select>
      <div className="flex justify-center items-center w-full gap-x-2 text-xl">
        <Image src={selectedCountry.flag} alt="usd" width={20} height={20} />
        <span>
          {Number(selectedCountry.rate.toFixed(2)).toLocaleString("es-CL", {
            style: "currency",
            currency: selectedCountry.currency,
          })}
        </span>
        <span>➡</span>
        <span>
          {Number(1).toLocaleString("es-CL", {
            style: "currency",
            currency: "USD",
          })}
        </span>
        <Image
          src="/flags/united-states.png"
          alt="usd"
          width={20}
          height={20}
        />
      </div>
      <Form value={amount} onChange={setAmount} country={selectedCountry} />
      <section>
        <h2 className="text-center text-2xl font-semibold">
          {Number(amount / selectedCountry.rate).toLocaleString("es-CL", {
            style: "currency",
            currency: "USD",
          })}
        </h2>
        <p className="italic text-xs text-center text-gray-900 mt-2">
          Actualizado: {updatedAt}
        </p>
      </section>
      <footer>
        👨‍💻 by{" "}
        <a
          className="underline text-slate font-semibold"
          href="https://github.com/nedilio"
          target="_blank"
          rel="noreferrer"
        >
          @nedilio
        </a>
      </footer>
    </div>
  );
}
