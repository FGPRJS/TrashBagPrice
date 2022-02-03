import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import EventBus from "../../event/EventBus";

export default function(props){
    const [locationText, setLocationText] = useState("");
    const [styleName, setStyleName] = useState("toTransparent");

    useEffect(() => {
        EventBus.on('ElementHover',(event)=>{
            setLocationText(event.target);
            setStyleName("toVisible");
        });
        EventBus.on('ElementLeave',(event)=>{
            setLocationText("");
            setStyleName("toTransparent");
        });
    })

    return <div id="LocationName" className={styleName + " " + "marginCenter"}>
            <div className="fontSize32px textCenter fontBlackHanSans fontColorBlack">{locationText}</div>
        </div>
}