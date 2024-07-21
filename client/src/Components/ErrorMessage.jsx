import React from "react";


function ErrorMessages(props){

    return <div className="errors">
        <div className="messages">
            <h2>There was a problem</h2>
            <ul>
                {props.messages?.map((message) => {
                    return <li>{message}</li>
                })}
            </ul>
        </div>
    </div>
}

export default ErrorMessages;