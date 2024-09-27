import React from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { customDatePicker } from './CustomStyle';

const CalendarModal = ({ isVisible, onClose, defaultDate, onDateChange }) => {
    if (!isVisible) return null;
    const handleCloseClick = (e: Event) => {
      e.stopPropagation();
      onClose();
    };
    let _defaultDate=dayjs(defaultDate);
    return (
        <div className="modal right-[60px]" onClick={handleCloseClick}>
            <div className="modal-content bg-white" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={onClose}>
                &times;
            </button>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar   slotProps={customDatePicker} value={_defaultDate} views={['year', 'month', 'day']} onChange={onDateChange}/>
            </LocalizationProvider>
            </div>
        </div>
    );
  };
export default CalendarModal;