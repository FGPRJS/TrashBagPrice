import React from "react";
import { useState } from "react/cjs/react.development";

export default function(props){
    const [style, setStyle] = useState({
        width : window.innerWidth / 10,
        height : window.innerWidth / 10,
    });
    const [fontStyle, setFontStyle] = useState({
        fontSize : window.innerWidth / 40,
    })

    return <div className="">
            <img style = {style} src = {props.src} alt="NO IMAGE" />
            <div className="fontBlackHanSans fontColorLight textCenter marginCenter" style={fontStyle}>{props.value + " 원"}</div>
        </div>
}