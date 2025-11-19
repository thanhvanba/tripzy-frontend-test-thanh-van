"use client";

import { useState, useEffect } from "react";
import { DatePicker, Calendar } from "antd";
import dayjs, { Dayjs } from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  weekStart: 1,
});

import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import "../globals.css";
import { PiCalendarBlankBold } from "react-icons/pi";
const { RangePicker } = DatePicker;

interface CustomDatePickerProps {
  disabled: boolean;
  value?: Dayjs | null;
  onChange?: (value: Dayjs | null) => void;
  placeholder?: string;
}

const CustomDatePicker = ({
  disabled,
  value,
  onChange,
  placeholder = "DD / MM / YYYY  00:00",
}: CustomDatePickerProps) => {
  const [rangeValue, setRangeValue] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);
  const [open, setOpen] = useState<boolean>(false);
  const [panelMonth, setPanelMonth] = useState(dayjs());

  useEffect(() => {
    if (value) {
      setRangeValue([value, null]);
    } else {
      setRangeValue(null);
    }
  }, [value]);

  const handleSelect = (date: Dayjs) => {
    setRangeValue([date, null]);
    setTimeout(() => {
      setOpen(false);
      onChange?.(date);
    }, 100);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <div className="">
      <RangePicker
        allowEmpty
        size="large"
        value={rangeValue}
        // onChange={handleChange}
        onOpenChange={handleOpenChange}
        open={open}
        placeholder={[placeholder, placeholder]}
        separator=""
        allowClear
        className="w-full custom-date-picker h-[52px]"
        format="DD/MM/YYYY"
        suffixIcon={null}
        prefix={<PiCalendarBlankBold size={20} />}
        disabled={disabled || [false, true]}
        panelRender={() => (
          <div className="flex gap-3 md:gap-6 p-2 md:p-4 bg-white rounded-xl">
            {/* MONTH 1 */}
            <div className="w-1/2 md:w-[280px]">
              <div className="flex justify-between items-center mb-2">
                <button
                  className="p-2 hover:bg-gray-200 rounded-md"
                  onClick={() => setPanelMonth(panelMonth.subtract(1, "month"))}
                >
                  <LuChevronLeft />
                </button>
                <div className="font-semibold text-xs sm:text-sm md:text-base">
                  {panelMonth.format("MMMM YYYY")}
                </div>
                <div className="w-8" />
              </div>
              <Calendar
                fullscreen={false}
                value={panelMonth}
                headerRender={() => null}
                onSelect={handleSelect}
                fullCellRender={(date) =>
                  renderCell(date, rangeValue?.[0] ?? null, panelMonth)
                }
              />
            </div>

            {/* MONTH 2 */}
            <div className="w-1/2 md:w-[280px]">
              <div className="flex justify-between items-center mb-2">
                <div className="w-8" />
                <div className="font-semibold text-xs sm:text-sm md:text-base text-center">
                  {panelMonth.add(1, "month").format("MMMM YYYY")}
                </div>
                <button
                  className="p-2 hover:bg-gray-200 rounded-md"
                  onClick={() => setPanelMonth(panelMonth.add(1, "month"))}
                >
                  <LuChevronRight />
                </button>
              </div>
              <Calendar
                fullscreen={false}
                value={panelMonth.add(1, "month")}
                headerRender={() => null}
                onSelect={handleSelect}
                fullCellRender={(date) =>
                  renderCell(
                    date,
                    rangeValue?.[0] ?? null,
                    panelMonth.add(1, "month")
                  )
                }
              />
            </div>
          </div>
        )}
      />
    </div>
  );
};
export default CustomDatePicker;

function renderCell(
  date: Dayjs,
  selectedDate: Dayjs | null,
  currentMonth: Dayjs
) {
  const isCurrentMonth = date.month() === currentMonth.month();
  const isWeekend = date.day() === 0 || date.day() === 6;
  const isSelected = selectedDate?.isSame(date, "day") && isCurrentMonth;
  const isToday = date.isSame(dayjs(), "day");

  const base =
    "flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl transition text-xs sm:text-sm";

  return (
    <div
      className={`${base} ${
        isSelected
          ? "bg-[#19c0ff] text-white font-bold"
          : !isCurrentMonth
          ? "text-gray-300"
          : isToday
          ? "border border-[#19c0ff] text-[#19c0ff] font-bold"
          : isWeekend
          ? "text-red-500"
          : "text-black"
      }`}
    >
      {date.date()}
    </div>
  );
}
