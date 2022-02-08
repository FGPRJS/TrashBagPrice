import React from "react";
import { useEffect, useState } from "react"
import EventBus from "../../event/EventBus";

export default function(props){
    const [className, setClassName] = useState();
    
    useEffect(() => {
        EventBus.on("HideMapController", () => {
            setClassName("toRight_100px toWidth0 toTransparent");
        })
    },[]);

    return <button className = {"MapController"} onClick={() => {
        setClassName("toRight_300px");
        EventBus.dispatch("ShowMapController");
    }}>
        ShowController
    </button>;
}