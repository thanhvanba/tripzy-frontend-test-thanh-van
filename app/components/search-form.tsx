"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LocationSelect } from "./location-select";
import { HiMiniArrowsRightLeft } from "react-icons/hi2";
import { Checkbox, Form, InputNumber } from "antd";
import dayjs, { Dayjs } from "dayjs";
import CustomDatePicker from "./custom-datapicker";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";

interface FormData {
  from: string;
  to: string;
  departureDate: Dayjs | null;
  returnDate: Dayjs | null;
  isRoundTrip: boolean;
  passengers: number;
}

interface FormErrors {
  from?: string;
  to?: string;
  departureDate?: string;
  returnDate?: string;
  passengers?: string;
}

export function SearchForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    from: "",
    to: "",
    departureDate: null,
    returnDate: null,
    isRoundTrip: false,
    passengers: 1,
  });
  console.log("🚀 ~ SearchForm ~ formData:", formData);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSearch = (e: React.FormEvent) => {
    const searchParams = new URLSearchParams({
      mode: "bus",
      from: formData.from,
      to: formData.to,
      dep: formData.departureDate
        ? dayjs(formData.departureDate).format("YYYY-MM-DD")
        : "",
      ...(formData.isRoundTrip && {
        ret: formData.returnDate
          ? dayjs(formData.returnDate).format("YYYY-MM-DD")
          : "",
      }),
      pax: formData.passengers.toString(),
    });

    router.push(`/search?${searchParams.toString()}`);
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSearch}
      initialValues={{ passengers: 1 }}
    >
      <div className="flex flex-col md:flex-row md:gap-6 gap-4 p-4 justify-center">
        <div className="flex flex-1 gap-2 items-end">
          <div className="flex flex-1 flex-col gap-2">
            <Form.Item
              label={
                <span className="block text-xs font-medium text-[#65686F]">
                  FROM
                </span>
              }
              name="from"
              rules={[
                {
                  required: true,
                  message: "Please select a departure location",
                },
              ]}
            >
              <LocationSelect
                value={formData.from}
                onChange={(value) => {
                  console.log("🚀 ~ SearchForm ~ value:", value);
                  setFormData({ ...formData, from: value });
                  setErrors({ ...errors, from: undefined });
                }}
                placeholder="Enter city, terminal,..."
              />
            </Form.Item>
          </div>
          <div className="p-3 bg-white rounded-full shadow-lg mb-6">
            <HiMiniArrowsRightLeft className="text-[#19C0FF]" size={24} />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <Form.Item
              label={
                <span className="block text-xs font-medium text-[#65686F]">
                  TO
                </span>
              }
              name="to"
              rules={[
                { required: true, message: "Please select a destination" },
              ]}
            >
              <LocationSelect
                value={formData.to}
                onChange={(value) => {
                  setFormData({ ...formData, to: value });
                  setErrors({ ...errors, to: undefined });
                }}
                placeholder="Enter city, terminal,..."
              />
            </Form.Item>
          </div>
        </div>
        <div className="flex flex-1 gap-2 items-end">
          <div className="w-1/2 flex flex-col gap-2">
            <Form.Item
              label={
                <span className="block text-xs font-medium text-[#65686F]">
                  DEPARTURE DATE
                </span>
              }
              name="departureDate"
              rules={[
                { required: true, message: "Please select a departure date" },
              ]}
            >
              <CustomDatePicker
                disabled={false}
                value={formData.departureDate}
                onChange={(date) => {
                  setFormData({ ...formData, departureDate: date });
                  setErrors({ ...errors, departureDate: undefined });
                }}
              />
            </Form.Item>
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={formData.isRoundTrip}
                onChange={(e) => {
                  setFormData({ ...formData, isRoundTrip: e.target.checked });
                }}
                className="text-xs! font-medium! text-[#65686F]!"
              >
                ROUND TRIP?
              </Checkbox>
            </div>
            <Form.Item
              name="returnDate"
              rules={[
                {
                  required: formData.isRoundTrip,
                  message: "Please select a return date",
                },
              ]}
            >
              <CustomDatePicker
                disabled={!formData.isRoundTrip}
                value={formData.returnDate}
                onChange={(date) => {
                  setFormData({ ...formData, returnDate: date });
                  setErrors({ ...errors, returnDate: undefined });
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Form.Item
            label={
              <span className="block text-xs font-medium text-[#65686F] w-full!">
                NO. OF PASSENGER
              </span>
            }
            name="passengers"
            rules={[
              { required: true, message: "Minimum 1 passenger required" },
            ]}
          >
            <InputNumber
              min={1}
              size="large"
              value={formData.passengers}
              prefix={<FaUserAlt size={20} />}
              onChange={(value) => {
                setFormData({
                  ...formData,
                  passengers: Math.max(1, value || 1),
                });
                setErrors({ ...errors, passengers: undefined });
              }}
              className="w-full!"
            />
          </Form.Item>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="flex w-64 items-center justify-center gap-2 bg-[#19C0FF] hover:bg-[#19C0FF]/80 text-sm text-white font-semibold px-5 py-4 rounded-full cursor-pointer "
        >
          <BiSearch size={20} /> SEARCH
        </button>
      </div>
    </Form>
  );
}
