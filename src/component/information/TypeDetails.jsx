import React, { useState } from "react";

export default function temp(props){
    const [style, setStyle] = useState({
        width : window.innerWidth / 10,
        height : window.innerWidth / 10
    });

    return <div>
            <img style = {style} src = {props.src} alt={"NO IMAGE"} title = {props.title} />
        </div>
}