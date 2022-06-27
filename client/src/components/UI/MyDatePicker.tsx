import { useEffect, useState } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import classes from "./MyDatePicker.module.css";
import "./MyDatePicker.css";

type DatePickerProps = {
    startDate: string,
    endDate: string,
    label: string,
    onChange: Function,
    dateHandler: Function,
    min?: boolean
}

const MyDatePicker = (props: DatePickerProps) => {

    const startDate = new Date(props.startDate);
    const endDate = new Date(props.endDate);

    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 10);

    const [selectionRange, setSelectionRange] = useState<object>({
        startDate,
        endDate,
        key: 'selection',
    });

    useEffect(() => {
        props.dateHandler(selectionRange);
    }, [selectionRange]);

    const dateHandler = (rangesByKey: RangeKeyDict) => {
        setSelectionRange({
            ...selectionRange, startDate: rangesByKey.selection.startDate, endDate: rangesByKey.selection.endDate
        });
    }

    return (
        <div className={classes["date-picker-container"]}>

            <label className={classes["picker-label"]}>{props.label}</label>

            <DateRange
                minDate={props.min ? minDate : new Date()}
                ranges={[selectionRange]}
                onChange={dateHandler}
                rangeColors={["orange"]}
                className={classes["date-range"]}
            />
        </div>
    );
}

export default MyDatePicker;