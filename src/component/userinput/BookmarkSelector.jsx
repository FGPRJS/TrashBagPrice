import React, { useEffect, useState } from "react"
import bookmark from "../../data/Bookmark";
import EventBus from "../../event/EventBus";

export default function(props){

    const [bookmarkRegions, setBookmarkRegions] = useState([]);

    useEffect(()=> {
        EventBus.on("BookmarkUpdate", (event)=>{
            setBookmarkRegions(event.data);
        })
    },[]);


    let somethings = ["something1","something2","something3"]

    return <div>
        <div className = "fontBlackHanSans fontColorBlack" style={{
            fontSize : window.innerWidth/50,
            margin : window.innerWidth/100
        }}>북마크</div>
        <select id="BookmarkSelection" className="width100per">
        {
            bookmarkRegions.map((item, index)=>{
                return <option key = {index}>{item}</option>;
            })
        }
        </select>
    </div>
}