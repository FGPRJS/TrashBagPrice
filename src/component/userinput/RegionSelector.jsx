import React, { useEffect, useState } from "react";
import RegionName from "../../entity/RegionName";
import EventBus from "../../event/EventBus";
import AppQueryMaker from "../communicator/AppQueryMaker";

export default function(props){
    const [regionSelectorWrapper, setRegionSelectorWrapper] = useState({
        width : window.innerWidth / 3,
        left : -window.innerWidth / 3,
        transition: '.3s'
    });
    const [locationName, setLocationName] = useState("");
    const [regions, setRegions] = useState([]);

    useEffect(() => {
        EventBus.on("RegionClick", (event) => {
            setRegionSelectorWrapper(
            {
                width : window.innerWidth / 3,
                left: 0,
                transition: '.3s'
            });
            setLocationName(event.target);
            setRegions(RegionName[event.target]);
        }
        );
        EventBus.on("NonRegionClick", () => {
            setRegionSelectorWrapper(
                {
                    width : window.innerWidth / 3,
                    left : -window.innerWidth / 3,
                    transition: '.3s'
                });
                setLocationName("");
                setRegions([]);
        })
    },[]);

    return <div id= 'RegionSelectorWrapper' style={regionSelectorWrapper}>
    <div className="fontBlackHanSans textCenter" style = {{fontSize : "36px"}}>{locationName}</div>
    <div className = "fontBlackHanSans">시/군/구</div>
    <select id="RegionSelection" className="width100per">
    {
        regions.map((item, index) => {
            return <option key = {index} >{item}</option>
        })
    }
    </select>
    <div className = "fontBlackHanSans">쓰레기 종류</div>
    <div id = "trashprposwrapper">
        <input type="radio" id = "trashtypeChoice1"
        name="trashprpos" value="생활쓰레기"/>
        <label className = "fontBlackHanSans" htmlFor="trashtypeChoice1">생활</label>

        <input type="radio" id = "trashtypeChoice2"
        name="trashprpos" value="음식물쓰레기"/>
        <label className = "fontBlackHanSans" htmlFor="trashtypeChoice2">음식물</label>

        <input type="radio" id = "trashtypeChoice3" defaultChecked={true}
        name="trashprpos" value=""/>
        <label className = "fontBlackHanSans" htmlFor="trashtypeChoice3">모두</label>
    </div>
    <button className="width100per fontBlackHanSans bottom_0px" onClick={(event)=>{
        let newQuery = AppQueryMaker.makeBaseQuery();

        newQuery.appendConditionQuery('CTPRVN_NM',locationName);

        //Region Selector

        let selectElement = document.querySelector('#RegionSelection');

        let region = selectElement.options[selectElement.selectedIndex].value;

        newQuery.appendConditionQuery('SIGNGU_NM',region);

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
    }
    }>SEARCH</button>
        </div>
}