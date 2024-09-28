import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import dayjs from 'dayjs';
import { customDatePicker, customDigitalClockSectionItem } from './CustomStyle';
import { Task } from '../types/task';

interface EditTaskModalProps {
    isVisible: boolean;
    value: Task;
    onClose: () => {}
}

export default function EditTaskModal({isVisible, value, onClose}: EditTaskModalProps){
    if (!isVisible) return null;
    const color = "#426B1F";
    return (
        <>
            <div className="modal-backdrop" onClick={(e) => {
                e.stopPropagation();
                onClose();
            }}>
                <div className="modal-content w-3/6 bg-[#e0ebd6]" onClick={(e) => e.stopPropagation()}>
                    <div className="border-b-1">
                        <span className="font-bold text-matcha text-xl">Edit task</span>
                        <button className="modal-close" onClick={onClose}>
                            &times;
                        </button>
                    </div>        
                    <div className="bg-[#e0ebd6] py-5">
                        <div className="pb-2">
                            <input className="appearance-none border-2 border-gray-200 rounded-md w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white" placeholder="Task name" defaultValue={value.name}></input>
                        </div>
                        <div className="inline-flex gap-1 pb-2">
                            <>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker value={dayjs(value.start_time)} slotProps={{ ...customDatePicker, textField: { size: 'small'}}}/>
                                    <TimePicker value={dayjs(value.start_time)} slotProps={{ textField: { size: 'small' }, actionBar: { actions: [] }}}/>
                                    <div className="my-auto"><ArrowForwardIcon></ArrowForwardIcon></div>
                                    <TimePicker value={dayjs(value.finished_time)} slotProps={{ textField: { size: 'small' }, actionBar: { actions: [] }, digitalClockSectionItem: { ...customDigitalClockSectionItem }}}/>
                                </LocalizationProvider>
                            </>
                        </div>
                        <div>
                            <div>{value.finished_time ? <p className="text-sm text-gray-500	">Duration: {(value.finished_time.getTime() - value.start_time.getTime())/60000}</p> : <button><img src="check.png"></img></button>}</div>
                        </div>
                        <div className="min-h-40 grid grid-cols-2 divide-x divide-white ">
                            <div className="p-2 inline-flex">
                                <span className="font-bold text-matcha">Subtasks</span>&ensp;
                                <button className="px-3 h-fit bg-matcha text-white rounded-full">+ add a subtask</button>
                            </div>
                            <div className="p-2">
                                <textarea rows={10} className="appearance-none border-2 border-gray-200 rounded-md w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white resize-none h-20"
                                placeholder="Description..." value={value.description}></textarea>
                            </div>
                        </div>

                    </div>
                    <div>
                        <div className="flex items-end gap-1 justify-end">
                            <button className="px-3 py-1 bg-matcha text-white rounded-md">cancel</button>
                            <button className="px-3 py-1 bg-matcha text-white rounded-md">save</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}