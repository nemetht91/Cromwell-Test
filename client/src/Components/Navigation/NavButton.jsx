import React from "react";

function NavButton(props){

    function handleClick(){
        props.navigate();
    }

    return <div className="navbutton">
        <p onClick={handleClick}>{props.name}</p>
    </div>
}

export default NavButton;