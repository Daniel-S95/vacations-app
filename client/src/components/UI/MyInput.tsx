import React, { ReactChild, useState } from "react";

import { Input, TextArea, Form } from "semantic-ui-react";
import classes from "./MyInput.module.css";

type ChangeEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;

type Props = {
    inputLabel: string;
    icon?: ReactChild;
    type: {
        type: string;
        placeholder: string;
        onChange?(e: ChangeEvent): void;
        value?: string;
        maxLength?: number;
        min?: number;
        step?: number;
        max?: number;
    }
    tabIndex?: number;
    isRequired?: boolean;
    showAsterisk?: boolean;
    restrictions?: string;
    style?: {};
};

const MyInput = (props: Props) => {

    const [inputFieldError, setInputFieldError] = useState(false);
    const [textAreaFieldError, setTextAreaFieldError] = useState({});

    const updateEmptyInputClass = (e: ChangeEvent) => {
        if (e.target.value.trim() === "") {
            setInputFieldError(true);
        } else {
            setInputFieldError(false);
        }
    }

    const updateEmptyTextAreaClass = (e: React.FormEvent<HTMLTextAreaElement>) => {
        if ((e.target as HTMLTextAreaElement).value.trim() === "") {
            setTextAreaFieldError({ backgroundColor: "#fff6f6", borderColor: "#e0b4b4", color: "#9f3a38" });
        } else {
            setTextAreaFieldError({});
        }
    }

    return (
        <div className={classes["input-flex-container"]} style={{ width: "100%" }}>
            <span>
                <label className={classes["input-label"]}>{props.inputLabel}</label>
                {props.isRequired && props.showAsterisk && <label style={{ color: "red" }}>*</label>}
            </span>

            {!props.isRequired && <Input style={{ width: "90%" }} error={inputFieldError} icon={props.icon} iconPosition='left'
                type={props.type.type} placeholder={props.type.placeholder} min={props.type.min} max={props.type.max} step={props.type.step}
                maxLength={props.type.maxLength} value={props.type.value} onChange={props.type.onChange} tabIndex={props.tabIndex} />
            }

            {props.isRequired && props.type.type !== "textarea" &&
                <Input style={{ width: "90%" }} error={inputFieldError} icon={props.icon} iconPosition='left'
                    type={props.type.type} placeholder={props.type.placeholder} min={props.type.min} max={props.type.max} step={props.type.step}
                    maxLength={props.type.maxLength} value={props.type.value} onChange={props.type.onChange}
                    onInput={updateEmptyInputClass} onBlur={updateEmptyInputClass} tabIndex={props.tabIndex} />}

            {props.type.type === "textarea" &&
                <Form style={{ width: "95%" }}>
                    <TextArea style={{ ...textAreaFieldError, height: "200px" }} placeholder={props.type.placeholder}
                        value={props.type.value} onChange={props.type.onChange} onInput={updateEmptyTextAreaClass}
                        maxLength={props.type.maxLength} onBlur={updateEmptyTextAreaClass} tabIndex={props.tabIndex} />
                </Form>}

            {props.restrictions && <label className={classes["input-restriction"]}>{props.restrictions}</label>}
        </div >
    );
}

export default MyInput;