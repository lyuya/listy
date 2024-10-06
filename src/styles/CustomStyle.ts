import { TimePickerSlotProps } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export const customDatePicker = {
  day: {
    sx: {
      "&.MuiPickersDay-root.Mui-selected": {
        backgroundColor: "var(--primary)",
      },
    },
  },
  monthButton: {
    sx: {
      "&.MuiPickersMonth-monthButton.Mui-selected": {
        backgroundColor: "var(--primary)",
      },
    },
  },
  yearButton: {
    sx: {
      "&.MuiPickersYear-yearButton.Mui-selected": {
        backgroundColor: "var(--primary)",
      },
    },
  },
};

export const customDigitalClockSectionItem: TimePickerSlotProps<
  dayjs.Dayjs,
  false
> = {
  popper: {
    sx: {
      "& .MuiMenuItem-root": {
        "&.Mui-selected": {
          backgroundColor: "var(--primary)",
        },
        "&.Mui-selected:hover": {
          backgroundColor: "var(--primary)",
        },
      },
    },
  },
};

export const customCssTextField = {
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #e5e7eb",
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    border: "2px solid " + "var(--primary)",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "2px solid " + "var(--primary)",
  },
};
