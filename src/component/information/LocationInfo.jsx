import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import EventBus from "../../event/EventBus";

export default function(props){
    const [locationText, setLocationText] = useState("");
    const [styleName, setStyleName] = useState("toTransparent toHeight0");

    useEffect(() => {
        EventBus.on('ElementHover',(event)=>{
            setLocationText(event.target);
            setStyleName("toVisible toHeight100px");
        });
        EventBus.on('ElementLeave',(event)=>{
            setLocationText("");
            setStyleName("toTransparent toHeight0");
        });
    })

    return <div id="LocationName" className={styleName + " " + "marginCenter"}>
            <div className="fontSize32px textCenter fontBlackHanSans fontColorBlack">{locationText}</div>
        </div>
}