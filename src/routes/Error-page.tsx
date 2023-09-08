import { useRouteError } from "react-router-dom";
import '../styles/Error.css'
import React from "react";
import { IError } from "../Interfaces";

export default function ErrorPage() {
    const error = useRouteError() as IError;
    console.error(error)
    return (
        <>
           <div className="error">
                <h1 className="error-title"> 
                    Oops! 
                </h1>
                <p className="p-message-error">
                    Sorry a unexpected error happened
                </p>
                <p>
                    <i className="message-error">
                        {error.statusText || error.message }
                    </i>
                </p>
           </div>
        </>
    )
}  