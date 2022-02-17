import React, {useEffect, useState} from "react";
import EventBus from "../../event/EventBus";

export default function(props){
    const [message, setMessage] = useState("");
    const [className, setClassName] = useState("toTopN5p toTransparent");


    useEffect(()=>{
        EventBus.on("Notice", (data)=>{
            setMessage(data.message);
            setClassName("toTop5p toVisible");
            setTimeout(()=>{
                setClassName("toTopN5p toTransparent");
            }, 1000);
        })
    },[]);
    
    return <div id = "UserNotice" className={className + " fontSize32px"}>
        {message}
    </div>;
}