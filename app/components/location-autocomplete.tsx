"use client";

import { AutoComplete, Input, Select } from "antd";
import { FaBusAlt } from "react-icons/fa";
import "../globals.css";
import { locations } from "../data/location";

interface Location {
  short_code: string;
  english_name: string;
  code_state?: string;
}

interface LocationSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function LocationAutoComplete({
  value,
  onChange,
  placeholder = "Enter city, location...",
}: LocationSelectProps) {
  const options = locations.map((loc: Location) => ({
    value: loc.english_name,
    label: (
      <div className="px-1 py-2">
        <div className="font-semibold text-xs sm:text-sm text-[#0E0E12]">
          {loc.short_code} - {loc.english_name}
        </div>
        <div className="font-semibold text-xs text-[#65686F]">
          {loc.code_state}
        </div>
      </div>
    ),
  }));
  return (
    <AutoComplete
      value={value}
      size="large"
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      prefix={<FaBusAlt size={20} />}
      filterOption={(input, option) =>
        option
          ? option.value.toLowerCase().includes(input.toLowerCase())
          : false
      }
      className="w-full custom-select h-[52px]!"
      styles={{
        popup: {
          root: { width: 400, maxWidth: "calc(100vw - 60px)" },
        },
      }}
    />
  );
}
