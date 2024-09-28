import React, { useMemo } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { customDatePicker } from './CustomStyle';

interface CalendarModalProps {
    onClose: () => {};
    defaultDate: Date;
    onDateChange: () => {}
}

const CalendarModal = ({ onClose, defaultDate, onDateChange }: CalendarModalProps) => {
    const handleCloseClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        onClose();
    };

    const _defaultDate = useMemo(() => dayjs(defaultDate), [defaultDate])

    return (
        <div className="modal right-[60px]" onClick={handleCloseClick}>
            <div className="modal-content bg-white" onClick={(event) => event.stopPropagation()}>
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
