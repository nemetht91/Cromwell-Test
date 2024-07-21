import React from "react";
import { Link } from "react-router-dom";

function Logo(props){

    function handleClick(){
        props.navigate();
    }

    return <h2 onClick={handleClick} className="logo">C<span>romwell </span>T<span>est</span></h2>
}

export default Logo;