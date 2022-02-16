import React, {useEffect, useState} from "react";
import EventBus from "../../event/EventBus";

export default function(props){
    const [message, setMessage] = useState("");
    const [className, setClassName] = useState("toHeight0 toTransparent");


    useEffect(()=>{
        EventBus.on("Notice", (data)=>{
            setMessage(data.message);
            setClassName("toVisible toFitContent");
            setTimeout(()=>{
                setClassName("toHeight0 toTransparent");
            }, 1000);
        })
    },[]);
    
    return <div id = "UserNotice" className={className}>
        {message}
    </div>;
}