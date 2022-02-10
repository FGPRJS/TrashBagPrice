import React from "react";
import { useEffect, useState } from "react"
import EventBus from "../../event/EventBus";

export default function(props){
    const [className, setClassName] = useState();
    const [style, setStyle] = useState({
        width : window.innerHeight / 20,
        height : window.innerHeight / 20
    });
    
    useEffect(() => {
        EventBus.on("HideMapController", () => {
            setClassName("toRight_100px toWidth0 toTransparent");
        })
    },[]);

    return <button className = {"MapController material-icons"} onClick={() => {
        setClassName("toRight_300px");
        EventBus.dispatch("ShowMapController");
    }} style = {style}>
        control_camera
    </button>;
}