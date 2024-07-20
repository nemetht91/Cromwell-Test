import React from "react";

function InputBox(props){

    return <div className="form-group">
    <label for={props.name}>{props.label}</label>
    <input onChange={() => props.onChange} type="text" className="form-control" maxLength={50}  name={props.name}/>
</div>
}

export default InputBox;