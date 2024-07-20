import React from "react";

function InputBox(props){

    function handleChange(event){
        const newValue = event.target.value;
        const inputName = event.target.name;

        props.updateField(inputName, newValue);
    }

    return <div className="form-group">
    <label htmlFor={props.name}>{props.label}</label>
    <input onChange={handleChange} type="text" className="form-control" maxLength={50}  name={props.name} value={props.value}/>
</div>
}

export default InputBox;