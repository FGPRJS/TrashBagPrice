import React, { useEffect, useState } from "react"
import bookmark from "../../data/Bookmark";
import EventBus from "../../event/EventBus";
import AppQueryMaker from "../communicator/AppQueryMaker";

export default function(props){

    const [bookmarkRegions, setBookmarkRegions] = useState([]);

    useEffect(()=> {
        bookmark.readCookie();
        setBookmarkRegions(bookmark.data);

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
        <button id = "searchButton" className="width100per material-icons" onClick={(event)=>{
            let newQuery = AppQueryMaker.makeBaseQuery();

            //Region Selector

            let selectElement = document.querySelector('#BookmarkSelection');

            let raw_input = selectElement.options[selectElement.selectedIndex].value.split(' ');

            console.log(raw_input);
            newQuery.appendConditionQuery('CTPRVN_NM',raw_input[0]);
            newQuery.appendConditionQuery('SIGNGU_NM',raw_input[1]);

            //Trashprpos Selector

            const radioButtons = document.querySelectorAll('input[name="trashprpos"]');

            let selectedprpos;

            for (const radioButton of radioButtons) {
                if (radioButton.checked && radioButton.value != "") {
                    selectedprpos = radioButton.value;
                    newQuery.appendConditionQuery('WEIGHTED_ENVLP_PRPOS',selectedprpos);
                    break;
                }
            }

            let result = newQuery.url + newQuery.getResult();

            console.log(result);

            fetch(result)
            .then(response => 
                response.json()
            )
            .then(data => {
                EventBus.dispatch("LoadComplete", {});
                EventBus.dispatch("ShowResultData", {result : data});
            })

            //Fold
            EventBus.dispatch("NonRegionClick", {});
            EventBus.dispatch("Loading", {});
        }}>search</button>
    </div>
}