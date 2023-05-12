﻿"use client";

import { Country } from "@/types/types";
import React from "react";

interface Props {
  value: number;
  onChange: (amount: number) => void;
  country: Country;
}

function Form({ value, onChange, country }: Props) {
  return (
    <form className="w-full">
      <label className="block space-y-1 text-lg">
        <span className="block text-center">Monto en {country.currency}:</span>
        <input
          className="block w-full rounded-full bg-green-700 p-2 text-right text-3xl"
          type="number"
          min={0}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </label>
    </form>
  );
}

export default Form;