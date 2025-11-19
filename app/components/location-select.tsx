"use client";

import { Select } from "antd";
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

export function LocationSelect({
  value,
  onChange,
  placeholder = "Enter city, location...",
}: LocationSelectProps) {
  const options = locations.map((loc: Location) => ({
    value: loc.english_name,
    label: (
      <div className="px-3 sm:px-4 py-2">
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
    <Select
      prefix={<FaBusAlt size={20} />}
      allowClear
      size="large"
      value={value || undefined}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      optionLabelProp="value"
      filterOption={(input, option) =>
        (option?.value as string).toLowerCase().includes(input.toLowerCase())
      }
      className="w-full custom-select h-[52px]!"
      dropdownStyle={{ width: "calc(100vw - 32px)", maxWidth: 400 }}
    />
  );
}
