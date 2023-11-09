import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  StaticDateRangePicker,
  StaticDateRangePickerSlotsComponentsProps,
} from "@mui/x-date-pickers-pro/StaticDateRangePicker";
import { PickersShortcutsItem } from "@mui/x-date-pickers/PickersShortcuts";
import { DateRange } from "@mui/x-date-pickers-pro";
import { viVN } from "@mui/x-date-pickers/locales";
import "dayjs/locale/vi";
import { useState } from "react";

const TimeDurationPicker = ({ field }) => {
  const [selectedDate, setSelectedDate] = useState<DateRange<Dayjs>>([
    null,
    null,
  ]);

  const shortcutsItems: PickersShortcutsItem<DateRange<Dayjs>>[] = [
    {
      label: "Trong tuần này",
      getValue: () => {
        const today = dayjs();
        return [today.startOf("week"), today.endOf("week")];
      },
    },
    {
      label: "Trong tháng này",
      getValue: () => {
        const today = dayjs();
        return [today.startOf("month"), today.endOf("month")];
      },
    },
    {
      label: "Tháng tiếp theo",
      getValue: () => {
        const today = dayjs();
        const startOfNextMonth = today.endOf("month").add(1, "day");
        return [startOfNextMonth, startOfNextMonth.endOf("month")];
      },
    },
    { label: "Tạo lại", getValue: () => [null, null] },
  ];

  const handleDateChange = (newDate: DateRange<Dayjs>) => {
    setSelectedDate(newDate);
    field.onChange(newDate);
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      dateLibInstance={dayjs}
      adapterLocale={"vi"}
      localeText={
        viVN.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <StaticDateRangePicker
        slotProps={
          {
            shortcuts: {
              items: shortcutsItems,
            },
            actionBar: { actions: [] },
          } as StaticDateRangePickerSlotsComponentsProps<Dayjs>
        }
        calendars={2}
        value={selectedDate}
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  );
};

export default TimeDurationPicker;
