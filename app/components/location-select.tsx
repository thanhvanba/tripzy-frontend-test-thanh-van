"use client";

import { Select } from "antd";
import locationsData from "../data/locations.json";
import { FaBusAlt } from "react-icons/fa";

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
  const options = locationsData.export_const_locations.map((loc: Location) => ({
    value: loc.english_name,
    label: (
      <div>
        <div className="font-semibold text-sm text-[#0E0E12]">
          {loc.english_name}
        </div>
        <div className="font-semibold text-xs text-[#65686F]">
          {loc.short_code}
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
      filterOption={(input, option) =>
        (option?.value as string).toLowerCase().includes(input.toLowerCase())
      }
      className="w-full"
      dropdownStyle={{ width: 400 }}
    />
  );
}
