import React, {useState} from "react";
export function useForm<T>(inputValues: T) {

    const [values, setValues] = useState(inputValues);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
}
