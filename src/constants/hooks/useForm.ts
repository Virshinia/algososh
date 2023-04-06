import React, {useState} from "react";
export function useForm<T>(inputValues: T) {

    const [values, setValues] = useState(inputValues);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        let value = isNaN(event.target.valueAsNumber) ? event.target.value : event.target.valueAsNumber;
        setValues({...values, [event.target.name]: value});
    };
    return {values, handleChange, setValues};
}
