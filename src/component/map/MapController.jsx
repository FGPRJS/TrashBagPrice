import React from "react";
import { useEffect, useState } from "react"
import EventBus from "../../event/EventBus";

export default function(props){
    const [className, setClassName] = useState("toTransparent");
    const [style, setStyle] = useState({
        width : "0px",
        height : "0px"
    });
    
    useEffect(() => {
        EventBus.on("ShowMapController", () => {
            setClassName("toVisible");
            setStyle({
                width : "fit-content",
                height : "fit-content"
            });
        })

        let regionout = () => {
            setClassName("toTransparent");
            setStyle({
                width : "0px",
                height : "0px"
        })};

        EventBus.on("RegionClick", regionout);
        EventBus.on("NonRegionClick", regionout);

    }, []);
    
    
    return <div className={className + " baseBox MapController"} style = {style}>
        <span className="tipmargin fontBlackHanSans fontColorLight">MAP CONTROLLER</span>

        <div className="baseflex">
            <button className = "material-icons tipmargin" onClick = {() => {
                EventBus.dispatch("MapZoomIn");
            }}>zoom_in</button>
            <button className = "material-icons tipmargin" onClick = {() => {
                EventBus.dispatch("MapZoomOut");
            }}>zoom_out</button>
        </div>
        
        <div className="baseflex">
            <button className = "material-icons tipmargin" onClick = {() => {
                EventBus.dispatch("MapGoLeft");
            }}>arrow_forward</button>
            <button className = "material-icons tipmargin" onClick = {() => {
                EventBus.dispatch("MapGoRight");
            }}>arrow_back</button>
            <button className = "material-icons tipmargin" onClick = {() => {
                EventBus.dispatch("MapGoUp");
            }}>arrow_downward</button>
            <button className = "material-icons tipmargin" onClick = {() => {
                EventBus.dispatch("MapGoDown");
            }}>arrow_upward</button>
        </div>
      
        <button className = "material-icons tipmargin" onClick={() => {
            EventBus.dispatch("HideMapController");
            setClassName("toTransparent");
            setStyle({
                width : "0px",
                height : "0px"
            })
        }}>hide_source</button>
    </div>;
}