import { Country } from "@/types/types";
import HomeClient from "./client";

let COUNTRIES: Country[] = [
  {
    name: "South Africa",
    code: "ZA",
    flag: "/flags/002-south-africa.png",
    currency: "ZAR",
    rate: 0,
  },
  {
    name: "Kenya",
    code: "KE",
    flag: "/flags/001-kenya.png",
    currency: "KES",
    rate: 0,
  },
  {
    name: "Ethiopia",
    code: "ET",
    flag: "/flags/003-ethiopia.png",
    currency: "ETB",
    rate: 0,
  },
];

export default async function Home() {
  const data = await fetch(
    "https://exchangerate-api.p.rapidapi.com/rapid/latest/USD",
    {
      headers: {
        "X-RapidAPI-Key": "f5b8bf79e4msh25787ede94720aep17173ejsne2e841f052f2",
        "X-RapidAPI-Host": "exchangerate-api.p.rapidapi.com",
      },
    }
  ).then((res) => res.json());
  const { rates, time_last_update_utc } = data;
  COUNTRIES = COUNTRIES.map((country) => {
    country.rate = rates[country.currency];
    return country;
  });

  const retrieveDate: string = time_last_update_utc;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-yellow-200 ">
      <h1 className="text-3xl italic font-black text-center mb-4">
        CurrencyExchange
      </h1>
      <div className="border border-2 border-black w-full max-w-lg justify-center p-8 shadow-lg bg-red-500 text-white rounded-2xl">
        <HomeClient countries={COUNTRIES} date={time_last_update_utc} />
      </div>
    </main>
  );
}
