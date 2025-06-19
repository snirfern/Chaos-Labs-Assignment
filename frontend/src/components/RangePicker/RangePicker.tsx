import React, {useEffect, useMemo, useRef, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {format} from 'date-fns';
import {DatePickerPropTypes} from './Interfaces';
import {useAppContext} from '../../context';

const InputStyle: React.CSSProperties = {
    height: '30px',
    padding: '8px 12px',
    cursor: 'pointer',
    border: '1px solid #ccc',
    borderRadius: '4px',
    textAlign: 'center',
    outline: 'none',
    boxShadow: 'none',
};
const IconStyle: React.CSSProperties = {
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'gray',
    cursor: 'pointer',
    fontSize: '1.2rem',
    userSelect: 'none',
    fontWeight: 'bold',
};

function CustomDatePicker({component_id, disabled}: DatePickerPropTypes) {
    const {chartController} = useAppContext();

    const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({
        from: null,
        to: null,
    });

    const [isCalendarOpen, setIsCalenderOpen] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleDateChange = async ([from, to]: [Date | null, Date | null]) => {
        if (from && to)
            await chartController.fetchActiveUsersByChain(from, to)

        setDateRange((prev) => {
            const newRange = {from, to};
            if (from && to) {
                setIsCalenderOpen(false);
                chartController.setDateRange(from, to);
            }
            return newRange;
        });

    };


    const formatDateRange = useMemo(() => {
        return (from: Date | null, to: Date | null): string => {
            if (!from && !to) return '';
            let outputDate = '';
            if (from) outputDate += format(from, 'MMM d');
            if (to) outputDate += ' - ' + format(to, 'MMM d');
            return outputDate;
        };
    }, []);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsCalenderOpen(false);
            }
        };

        if (isCalendarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isCalendarOpen]);
    const handleClear = () => {
        setDateRange({from: null, to: null});
        chartController.setDateRange(null, null);
        setIsCalenderOpen(false);
    };
    const CustomInputRef = useMemo(
        () =>
            React.forwardRef<HTMLInputElement, React.HTMLProps<HTMLInputElement>>((props, ref) => (
                <div style={{position: 'relative', display: 'inline-block'}}>
                    <input
                        {...props}
                        ref={ref}
                        onClick={() => setIsCalenderOpen(!isCalendarOpen)}
                        value={formatDateRange(dateRange.from, dateRange.to)}
                        readOnly
                        placeholder="From - To"
                        id={component_id}
                        disabled={disabled}
                        style={InputStyle}
                    />
                    {dateRange.from && dateRange.to && !disabled && (
                        <span
                            className="material-symbols-outlined"
                            onClick={handleClear}
                            style={IconStyle}
                            title="Clear date"
                        >
                        delete
                        </span>
                    )}
                </div>
            )),
        // eslint-disable-next-line
        [dateRange, disabled, isCalendarOpen]
    );

    const ref = useRef<HTMLInputElement>(null);

    return (
        <div ref={containerRef}>
            <DatePicker
                readOnly={disabled}
                onChange={handleDateChange}
                startDate={dateRange.from}
                endDate={dateRange.to}
                selectsRange
                open={isCalendarOpen}
                customInput={<CustomInputRef ref={ref}/>}
                showMonthYearDropdown
                minDate={new Date(1900, 0, 1)}
                maxDate={new Date(2100, 11, 31)}
            />
        </div>
    );
}

export default CustomDatePicker;
