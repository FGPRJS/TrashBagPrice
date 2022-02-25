import React, { useEffect, useState } from "react";
import EventBus from "../../event/EventBus.js";
import BookmarkSelector from "./BookmarkSelector.jsx";
import RegionSelector from "./RegionSelector.jsx";

const SelectorMode = {
    "Bookmark" : "Bookmark",
    "Region" : "Region"
}

export default function(props){
    const [regionSelectorWrapper, setRegionSelectorWrapper] = useState({
        width : window.innerWidth / 3,
        left : -window.innerWidth / 3,
        transition: '.3s'
    });
    const [mode, setMode] = useState(SelectorMode.Region);
    const [bookmarkMode, setBookmarkMode] = useState({
        "visibility": "hidden"
    });
    const [regionMode, setRegionMode] = useState({
        "visibility": "visible"
    });
    
    useEffect(() => {
        EventBus.on("RegionClick", (event) => {
            setRegionSelectorWrapper(
            {
                width : window.innerWidth / 3,
                left: 0,
                transition: '.3s'
            });
        }
        );
        EventBus.on("NonRegionClick", () => {
            setRegionSelectorWrapper(
                {
                    width : window.innerWidth / 3,
                    left : -window.innerWidth / 3,
                    transition: '.3s'
                });
        })
    }, [])

    return <div id= 'RegionSelectorWrapper' style={regionSelectorWrapper}>
        <button onClick={()=>{
            switch(mode){
                case SelectorMode.Bookmark :
                    setBookmarkMode({
                        "visibility": "visible"
                    })
                    setRegionMode({
                        "visibility": "hidden"
                    })
                    setMode(SelectorMode.Region);
                break;

                case SelectorMode.Region :
                    setBookmarkMode({
                        "visibility": "hidden"
                    })
                    setRegionMode({
                        "visibility": "visible"
                    })
                    setMode(SelectorMode.Bookmark);
                break;
            }
        }}>SWITCH TESTER</button>
        <div style={bookmarkMode}>
            <BookmarkSelector></BookmarkSelector>
        </div>
        <div style={regionMode}>
            <RegionSelector></RegionSelector>
        </div>
        
    </div>
}