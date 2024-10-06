import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ColorPaletteModal from "../modal/setting/colorPalette/ColorPaletteModal";
import CalendarModal from "../modal/setting/calendar/CalendarModal";
import SettingModal from "../modal/setting/SettingModal";
import { useDispatch } from "react-redux";
import { loadDateReducer } from "@/store/dateSlice";
import { useAppSelector } from "@/store/hooks";

export default function Header() {
  const dispatch = useDispatch();
  const date = useAppSelector((state) => state.date.value);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const updateDate = (date: Date) => {
    dispatch(loadDateReducer(date));
  };

  const addOneDay = (date: Date) => {
    const dateCloned = new Date(date);
    dateCloned.setDate(date.getDate() + 1);
    updateDate(dateCloned);
  };

  const minusOneDay = (date: Date) => {
    const dateCloned = new Date(date);
    dateCloned.setDate(date.getDate() - 1);
    updateDate(dateCloned);
  };
  const openCalendarModal = () => {
    setIsCalendarOpen(true);
  };

  const closeCalendarModal = () => {
    setIsCalendarOpen(false);
  };
  const onDateChange = (date: Dayjs) => {
    const newDate = date.toDate();
    updateDate(newDate);
  };

  const openSettingModal = () => {
    setIsSettingOpen(true);
  };

  const closeSettingModal = () => {
    setIsSettingOpen(false);
  };

  useEffect(() => {
    if (isCalendarOpen || isSettingOpen || isColorPaletteOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isCalendarOpen, isSettingOpen, isColorPaletteOpen]);

  return (
    <header>
      <div className="inline-flex w-full justify-between lg:px-8 md:px-4">
        <div className="text-2xl my-auto px-3">
          <button
            className="text-primary px-2"
            onClick={() => minusOneDay(date!)}
          >
            &#10094;
          </button>
          {date?.toLocaleString("default", { month: "long" })}
          &ensp;
          {date?.getDate().toLocaleString()}
          <span className="text-primary px-2">{date?.getFullYear()}</span>
          <button
            className="text-primary pr-2"
            onClick={() => addOneDay(date!)}
          >
            &#10095;
          </button>
        </div>
        <div className="m-4 flex gap-2">
          <button className="text-primary" onClick={openCalendarModal}>
            <EditCalendarOutlinedIcon fontSize="medium"></EditCalendarOutlinedIcon>
          </button>
          <button className="text-primary" onClick={openSettingModal}>
            <SettingsOutlinedIcon></SettingsOutlinedIcon>
          </button>
        </div>
      </div>

      {isColorPaletteOpen && (
        <ColorPaletteModal
          onClose={() => setIsColorPaletteOpen(false)}
        ></ColorPaletteModal>
      )}
      {isCalendarOpen && (
        <CalendarModal
          defaultDate={date!}
          onClose={closeCalendarModal}
          onDateChange={onDateChange}
        />
      )}
      {isSettingOpen && (
        <SettingModal
          onClose={closeSettingModal}
          openColorPaletteModal={() => setIsColorPaletteOpen(true)}
        ></SettingModal>
      )}
    </header>
  );
}
