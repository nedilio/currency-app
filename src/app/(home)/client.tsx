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
      <Image src={selectedCountry.flag} alt="flag" width={100} height={100} />
      <label htmlFor="country" className="italic fontsemibold text-lg">
        Selecciona el Pais
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
      <p className="text-sm">
        {Number(1).toLocaleString("es-CL", {
          style: "currency",
          currency: "USD",
        })}{" "}
        =
        {Number(selectedCountry.rate.toFixed(2)).toLocaleString("es-CL", {
          style: "currency",
          currency: selectedCountry.currency,
        })}
      </p>
      <Form value={amount} onChange={setAmount} country={selectedCountry} />
      <section>
        <h2 className="text-center text-2xl font-semibold">
          {Number(amount / selectedCountry.rate).toLocaleString("es-CL", {
            style: "currency",
            currency: "USD",
          })}
        </h2>
        <span className="italic text-xs text-gray-900">
          Actualizado: {updatedAt}
        </span>
      </section>
    </div>
  );
}
