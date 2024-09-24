
import React from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const ChangeTaskInfosModal = ({ isVisible, onClose }) => {
    if (!isVisible) return null;
  
    const handleCloseClick = (e: Event) => {
      e.stopPropagation();
      onClose();
    };
    const setDate = (newDate) => {}

    return (
        <div className="modal right-[60px]" onClick={handleCloseClick}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={onClose}>
                &times;
            </button>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar views={['year', 'month', 'day']} onChange={(newValue) => setDate(newValue)}/>
            </LocalizationProvider>
            </div>
        </div>
    );
  };
export default ChangeTaskInfosModal;