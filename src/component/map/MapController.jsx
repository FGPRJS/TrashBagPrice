import React from "react";
import { useEffect, useState } from "react"
import EventBus from "../../event/EventBus";

export default function(props){
    const [className, setClassName] = useState("toRight_n300px toTransparent");
    const [style, setStyle] = useState({
        width : "0px",
        height : "0px"
    });
    
    useEffect(() => {
        EventBus.on("ShowMapController", () => {
            setClassName("toRight_100px toVisible");
            setStyle({
                width : "200px",
                height : "200px"
            });
        })
    }, []);
    
    
    return <div className={className + " baseBox MapController"} style = {style}>
        <button onClick = {() => {
            EventBus.dispatch("MapZoomIn");
        }}>ZoomIn</button>
        <button onClick = {() => {
            EventBus.dispatch("MapZoomOut");
        }}>ZoomOut</button>
        <button onClick = {() => {
            EventBus.dispatch("MapGoLeft");
        }}>Left</button>
        <button onClick = {() => {
            EventBus.dispatch("MapGoRight");
        }}>Right</button>
        <button onClick = {() => {
            EventBus.dispatch("MapGoUp");
        }}>Up</button>
        <button onClick = {() => {
            EventBus.dispatch("MapGoDown");
        }}>Down</button>
        <button onClick={() => {
            EventBus.dispatch("HideMapController");
            setClassName("toTransparent");
            setStyle({
                width : "0px",
                height : "0px"
            })
        }}>Hide</button>
    </div>;
}