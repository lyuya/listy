import { TimePickerSlotProps } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import colors from "tailwindcss/colors";

const colorName = "amber";
const themeColor = colors[colorName][600];
const grey = "#e5e7eb";
export const customDatePicker = {
  day: {
    sx: {
      "&.MuiPickersDay-root.Mui-selected": {
        backgroundColor: themeColor,
      },
    },
  },
  monthButton: {
    sx: {
      "&.MuiPickersMonth-monthButton.Mui-selected": {
        backgroundColor: themeColor,
      },
    },
  },
  yearButton: {
    sx: {
      "&.MuiPickersYear-yearButton.Mui-selected": {
        backgroundColor: themeColor,
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
          backgroundColor: themeColor,
        },
        "&.Mui-selected:hover": {
          backgroundColor: themeColor,
        },
      },
    },
  },
};

export const customCssTextField = {
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    border: "1px solid " + grey,
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    border: "2px solid " + themeColor,
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "2px solid " + themeColor,
  },
};
