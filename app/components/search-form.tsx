"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LocationAutoComplete } from "./location-autocomplete";
import { HiMiniArrowsRightLeft } from "react-icons/hi2";
import { Checkbox, Form, InputNumber, message } from "antd";
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
  const [errors, setErrors] = useState<FormErrors>({});
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinishFailed = (errorInfo: any) => {
    const firstErrorField = errorInfo.errorFields[0];
    const msg = firstErrorField?.errors[0];
    if (msg) messageApi.warning(msg);
  };
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
    <>
      {contextHolder}
      <Form
        layout="vertical"
        onFinish={handleSearch}
        onFinishFailed={handleFinishFailed}
        initialValues={{ passengers: 1 }}
        requiredMark={false}
      >
        <div className="flex flex-col lg:flex-row lg:gap-6 gap-4 p-4 justify-center">
          <div className="flex flex-col lg:flex-row flex-1 lg:gap-2 items-center lg:items-end">
            <div className="flex flex-1 flex-col gap-2 w-full">
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
                <LocationAutoComplete
                  value={formData.from}
                  onChange={(value) => {
                    setFormData({ ...formData, from: value });
                    setErrors({ ...errors, from: undefined });
                  }}
                  placeholder="Enter city, terminal,..."
                />
              </Form.Item>
            </div>

            <div className="rotate-90 lg:rotate-0 p-3 bg-white rounded-full shadow-lg lg:mb-6">
              <HiMiniArrowsRightLeft className="text-[#19C0FF]" size={24} />
            </div>

            <div className="flex flex-1 flex-col gap-2 w-full">
              <Form.Item
                label={
                  <span className="block text-xs font-medium text-[#65686F]">
                    TO
                  </span>
                }
                name="to"
                rules={[
                  { required: true, message: "Please select a destination" },
                  {
                    validator: (_, value) => {
                      if (!value || value !== formData.from) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Same location not allowed")
                      );
                    },
                  },
                ]}
              >
                <LocationAutoComplete
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
          <div className="flex flex-col lg:flex-row flex-1 gap-2 items-end">
            <div className="w-full lg:w-1/2 flex flex-col gap-2">
              <Form.Item
                label={
                  <span className="block text-xs font-medium text-[#65686F]">
                    DEPARTURE DATE
                  </span>
                }
                name="departureDate"
                rules={[
                  {
                    required: true,
                    message: "Please select a departure date",
                  },
                  {
                    validator: (_, value) => {
                      if (!value) return Promise.resolve();
                      return !value.isBefore(dayjs(), "day")
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error("Departure must be after today")
                          );
                    },
                  },
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
            <div className="w-full lg:w-1/2 flex flex-col gap-2">
              <div className="flex items-center gap-2 custom-checkbox">
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
                  {
                    validator: (_, value) => {
                      if (
                        !formData.isRoundTrip ||
                        !formData.departureDate ||
                        !value
                      ) {
                        return Promise.resolve();
                      }
                      if (value.isAfter(formData.departureDate)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Return date must be after departure")
                      );
                    },
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
                className="w-full! custom-input-number h-[52px]!"
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
    </>
  );
}
