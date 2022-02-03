import React, { useEffect, useState } from "react";
import EventBus from "../event/EventBus";

export default function(props){

    const [styleName, setStyleName] = useState('toTransparent');

    useEffect(() => {
        EventBus.on('Loading', () => {
            console.log('loading...');

            setStyleName('toVisible');
        });
        EventBus.on('LoadComplete', () => {
            console.log('load complete');
    
            setStyleName('toTransparent');
        });
    },[])

    return <div id = "LoadingWindow" className={styleName}>
        Loading...
    </div>;
}